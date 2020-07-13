// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    goodsTypes: ['水果','家具','服装','电器']
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindchange: function(e){
    this.setData({
      index: e.detail.value
    })
  },
  selectMap: () => {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res)
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude
        })
      } 
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