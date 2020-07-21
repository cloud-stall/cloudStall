import {Change} from "./model-change"
const app = getApp();
const change = new Change()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    shopName:"1223232432",
    iconType: [
      'clear'
    ]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo);
    
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }

    
  },
  //数据请求模块
  _loadData(){
    
  },

  //清空输入框
  clearInput(){
    console.log(1);
    
    this.data.shopName = ''
    //修改data 中的 shopName
    this.setData({
      shopName:this.data.shopName
    })
  },
  //修改框input事件的监听
  changeText(e){
    console.log(e.detail.value)
    this.data.shopName = e.detail.value
    this.setData({
      shopName:this.data.shopName
    })
  },

  saveChange(){
    //测试修改用户名
    change.changeUserName(this.data.shopName,(res)=>{
      console.log(res)
      if(res.data.status){
        this.showFail(res.data.msg)
      }else{
        this.showSuccess(res.data.msg)
      }
    })

  },

  //弹出成功提示框
  showSuccess(t) {
    wx.showToast({
    title: t,
    mask: true,
    icon: 'success'
    })
  },

  showFail(t) {
    wx.showToast({
    title: t,
    mask: true,
    icon: 'success'
    })
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
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
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