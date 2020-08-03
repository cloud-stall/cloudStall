// pages/publish/publish.js
import {Base} from '../../utils/base'
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
    commodityname: '',
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
  // 发布
  publish: function(){
    let commodityimages = this.data.images.join(',')
    console.log(commodityimages)
    let obj = {
      commodityname: this.data.commodityname,
      typeIndex: this.data.goodsTypes[this.data.typeIndex],
      wxgprs: this.data.location,
      commodityprice: Number(this.data.newPrice),
      commodityoriginal:Number(this.data.oldPrice),
      bigtime: this.data.time,
      endtime: this.data.time2,
      commoditydetails: this.data.goodsTextarea, // 商品描述
      commodityimages: commodityimages,
      latitude:this.data.latitude,
      longitude: this.data.longitude

    }
    console.log(obj)
    let that = this
    wx.getStorage({
      key: 'token',
      success (res) {
        console.log(res.data)
        that.setData({
          token: res.data
        })
     console.log(that.data.token)
    
    wx.uploadFile({              
              url: urls + 'commodity/multifileUpload',
              filePath: that.data.filePath,
              name: 'files',
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'content-type': 'multipart/form-data',                
                'token': that.data.token
              },
              formData: {
                commodityname: that.data.commodityname,
                typeIndex: that.data.goodsTypes[that.data.typeIndex],
                wxgprs: that.data.location,
                commodityprice: that.data.newPrice,
                commodityoriginal:that.data.oldPrice,
                bigtime: that.data.time,
                endtime: that.data.time2,
                commoditydetails: that.data.goodsTextarea, // 商品描述
                commodityimages: commodityimages,
                latitude:that.data.latitude,
                longitude: that.data.longitude,
                files:that.data.images
              },
              success(res){
                
                console.log(res.data)
                let status = JSON.parse(res.data).status
                if(status){
                  wx.showToast({
                    title: '商品发布成功'
                  })
                  wx.navigateTo({
                    url: '../myshop/myshop'
                  })
                }
              },
              fail(esr){
                console.log(esr)
              }
            })

          }
        })
      
    // }
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
  //上传图片
  uploadPic: function(e){
    let that =  this
    wx.chooseImage({
      sizeType:['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const tempFilePaths = res.tempFilePaths
        const images = that.data.images.concat(res.tempFilePaths)
        that.data.images = images.length <=3 ? images: images.slice(0, 3)
        console.log('tttt', tempFilePaths, images)
        that.setData({
          images: images,
          filePath: tempFilePaths[0]
        })
        // wx.uploadFile({
        //   url: '/commodity/multifileUpload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'files',
        //   formData: {
            
        //   },
        //   success (res){
        //     const data = res.data
        //     //do something
        //     console.log(res)
        //   }
        // })
      }
    })
  },
  // 手机号授权
  getPhone: function(){
     let phone = wx.getStorageSync('phone')
    console.log(phone)
    if(!phone){
      console.log(phone)
      wx.navigateTo({
        url: '../regist2/regist2',
      })
    } else{
      return
    }
  },
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