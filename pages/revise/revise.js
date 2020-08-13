// pages/publish/publish.js
import {Base} from '../../utils/base'
import {Revise} from './model-revise'
var revise = new Revise();
//sdk
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
//base
let base = new Base();
let urls = base.baseRequestUrl
let locations = ''
wx.getStorageSync({
  key: 'location',
  success (res) {
    locations = res.data
  }
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    rank:['a','b'],
    typeIndex:0,
    goodsTypes: [],
    location:locations,
    newPrice: 0,
    oldPrice: 0,
    time: '10:00:00',
    time2:'22:00:00',
    radioItems:[
      {
        value:'全新',
        checked: true        
      },
      {
        value: '二手',
        checked: false
      }
    ],
    newValue: false,
    oldValue: [
      '1成新',
      '2成新',
      '3成新',
      '4成新',
      '5成新',
      '6成新',
      '7成新',
      '8成新',
      '9成新',
    ],
    goodsTextarea: '',
    images: [],
    longitude: 0,
    latitude: 0,
    commodityname: '123',
    token: '',
    qqmapsdk:{},
    filePath: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindchange: function(e){
    this.setData({
      typeIndex: e.detail.value
    })
  },
  radioChange: function(e){
    console.log(e)
    this.setData({
      newValue: e.detail.value
    })
  },
  bindchangeTime: function(e){
    this.setData({
      time: e.detail.value
    })
  },
  bindchangeTime2: function(e){
    this.setData({
      time2: e.detail.value
    })
  },
  //获取位置
  getLocation(e){
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res.address)
        console.log(res.latitude)
        console.log(res.longitude)
        console.log(res.name)
        var location = res.address
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          location: location
        })
      }
    })
  },
  goAgree: ()=>{
    console.log(1)
    wx.navigateTo({
      url: '../agree/agree',
    })
  },
  getName: function(e){
    console.log(e)
    this.setData({
      commodityname: e.detail.value
    })
  },
 
  //获取现价
  getNewPrice: function(e){
    this.setData({
      newPrice: e.detail.value
    })
  },
  //获取原价
  getoldPrice: function(e){
    this.setData({
      oldPrice: e.detail.value
    })
  },
  //获取商品描述
  getTextarea: function(e){
    this.setData({
      goodsTextarea: e.detail.value
    })
  },



  //选择图片 并 上传图片
  uploadPic: function(e){
    let that =  this
    //选择图片
    wx.chooseImage({
      sizeType:['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const tempFilePaths = res.tempFilePaths
        const images = that.data.images.concat(res.tempFilePaths)
        that.setData({
          images:images.length <=3 ? images: images.slice(0, 3)
        })
        console.log(that.data.images)
        that.dbFuc(tempFilePaths)
      }
    })
  },



  //上传图片请求
  async dbFuc(arr) {
    console.log(arr);
    console.log( arr )
    let promises = arr.map((doc) => revise.upDataImg(doc));
    let results = await Promise.all(promises);
    console.log(results); 
    var url=[];
    results.forEach((item)=>{
      url.push(item.data)
    })

    console.log(url)
    console.log(this.data)
  },


  //点击提交按钮 实现修改


  // 手机号授权
  // getPhone: function(){
  //    let phone = wx.getStorageSync('phone')
  //   console.log(phone)
  //   if(!phone){
  //     console.log(phone)
  //     wx.navigateTo({
  //       url: '../regist2/regist2',
  //     })
  //   } else{
  //     return
  //   }
  // },
  // 获取类型
  getTypes: function(){
    console.log(2)
    let that = this
    wx.request({
      method: 'POST',
      url: urls + '/commoditytype/commoditytypelist',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'token': wx.getStorageSync('token')
      },
      data:{},
      success: function(res){
        console.log(res)
        that.setData({
          goodsTypes: res.data
        })
      }
    })
  },
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'PWFBZ-XKLAP-FJODK-LHVW3-W5UB2-D6FVF'
    });
    this.setData({
      qqmapsdk: qqmapsdk
    })
   this.getTypes()
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
    qqmapsdk.search({
      keyword: '地摊',
      success: function (res) {
          console.log(res);
      },
      fail: function (res) {
          console.log(res);
      },
      success: function (res) {
          console.log(res);
      }
    })
    wx.showTabBar({
      animation: true
    })
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