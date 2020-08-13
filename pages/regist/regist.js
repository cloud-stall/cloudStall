// pages/regist/regist.js
const app = getApp()
import {Base} from '../../utils/base'
let base = new Base();
let urls = base.baseRequestUrl
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    name: '',
    isAuth: true,
    phoneNumber: '',
	token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('token')){
      this.data.isAuth = false
      if(wx.getStorageSync('phone')){
        wx.switchTab({
          url: '../index/index',
        })
      }
    }
  },
  cancelPhone: function(e){
    console.log(this.data.phoneNumber)
    this.data.phoneNumber = ''
    this.setData({
      phoneNumber: ''
    })
  },
  getUserInfo: function(e){
    let that = this
    console.log(e.detail.userInfo)
   app.globalData.userInfo = e.detail.userInfo
   wx.login({
    success (res) {
      console.log('rrr', res)
      // let token1 = res.code
      if (res.code) {
        //发起网络请求
        wx.request({
          method:'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          url: urls + 'weixin/getopenid',
          data: {
            code: res.code
          },
          success: (datas) => {
            console.log('tttt', datas)  
            wx.setStorageSync('token', datas.data.code)
            that.setData({
              isAuth: false
            })
          },
          fail(res3) {
            console.log("获取用户信息失败", res)
          }    
        })
      }
    }
  })
  // 获取token
  setTimeout(function(){
	  let token = wx.getStorageSync('token')
	   console.log(token)
	  wx.request({
	    method: 'POST',
	    header: {
	      'content-type': 'application/x-www-form-urlencoded',
	      'token': token
	    },
	    url: urls + 'weixin/gettoken',
	    data: {
	      city: e.detail.userInfo.city,
	      country: e.detail.userInfo.country,
	      createdate: '',
	      headimgurl: e.detail.userInfo.avatarUrl,
	      iphone: '1579655656',
	      nickname: e.detail.userInfo.nickName,
	      province: e.detail.userInfo.province,
	      sex: e.detail.userInfo.gender
	    },
	    success: (data2)=>{
	      console.log(data2)
	      wx.setStorageSync('token', data2.data.code)
	    }
	  }) 
  }, 800)
              
  },
  getPhoneNumber: function(e){
    this.setData({
      phoneNumber: e.detail.value
    })
    
  },
  goPhoneNumber: function(e) {
    let phoneNumber = this.data.phoneNumber
    let reg = (/^1[3456789]\d{9}$/.test(phoneNumber))
    console.log(phoneNumber)
    if(phoneNumber == '') {
      wx.showModal({
        title: '提示信息',
        content: '手机号不能为空',
        cancelColor: 'cancelColor'
      })
    } else if(!reg){
        wx.showModal({
          title: '提示信息',
          content: '手机号不正确，请重填',
          cancelColor: 'cancelColor'
        })
      }
      else {
        wx.setStorageSync('phone', phoneNumber)
        wx.switchTab({
          url: '../index/index',
        })
      }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})