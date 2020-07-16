// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    goodsTypes: ['水果','家具','服装','电器'],
    location:'qqq',
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
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindchange: function(e){
    this.setData({
      index: e.detail.value
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
  
    // wx.getLocation({
    //   type: 'gcj02',
    //   success: (res) => {
    //     console.log(res)
    //     wx.openLocation({
    //       latitude: res.latitude,
    //       longitude: res.longitude,
    //       success: (res2)=>{
    //         console.log(res2)
            
    //       }
    //     })
    //   } 
    // })
  },
  goAgree: ()=>{
    console.log(1)
    wx.navigateTo({
      url: '../agree/agree',
    })
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