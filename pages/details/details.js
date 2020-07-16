// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    site: ['0.5km', '1km', '2km', '3km', '4km', '5km'],
    latitude: 0,
    longitude: 0,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '/image/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '/image/location.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = options.id
    let longitude = options.longitude
    let latitude = options.latitude
    this.setData({
      id,
      latitude,
      longitude
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
   onShow: function(){
    console.log(this.data.longitude)
  //   wx.getSetting({
  //     complete: (res) => {
  //       console.log(res)
  //       if(res.authSetting[scope.userLocation]){
  //         wx.getLocation({
  //           altitude: this.data.latitude,
  //           longitude: this.data.longitude
  //         })
  //       }     
  //     },     
  // })
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