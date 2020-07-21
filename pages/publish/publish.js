// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rank:['a','b'],
    typeIndex:0,
    goodsTypes: ['水果','家具','服装','电器'],
    location:'qqq',
    newPrice: 0,
    time: '10:00',
    time2:'22:00',
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
    images: []
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
  // 发布
  publish: function(){
    let obj = {
      typeIndex: this.data.goodsTypes[this.data.typeIndex],
      location: this.data.location,
      newPrice: this.data.newPrice,
      oldPrice:this.data.oldPrice,
      time: this.data.time,
      time2: this.data.time2,
      goodsTextarea: this.data.goodsTextarea,
      pic: []
    }
    console.log(obj)
    if(!obj.typeIndex || !obj.location || !obj.newPrice){
      wx.showToast({
        title: '*必填项不能为空'
      })
    }
  },
  //获取现价
  getNewPrice: function(e){
    this.setData({
      newPrice: e.detail.value
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
          images: images
        })
        // wx.uploadFile({
        //   url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
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
  onLoad: function (options) {
   
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