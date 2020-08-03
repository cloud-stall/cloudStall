// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    site: ['0.5km', '1km', '2km', '3km', '4km', '5km'],
    latitude: 0,
    longitude: 0,
    markers: [],
    covers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =  this
    console.log(options)
    let id = options.id
    let longitude = options.longitude
    let latitude = options.latitude
    this.setData({
      id,
      latitude:latitude,
      longitude:longitude
    })
    // map
    
    wx.getSetting({
      complete: (res) => {
        console.log(res)
        if(res.authSetting['scope.userLocation']){
          wx.getLocation({
            type:'wgs84',
            success: function(res2){
              console.log(res2)
              that.setData({
                latitude: res2.latitude,
                longitude: res2.longitude 
              })            
            }
          })
        }     
      },     
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
goHere: function(){
  let that = this
  //选择地图
  wx.chooseLocation({
    success: function(res){
      console.log(res)
      that.setData({
        latitude: res.latitude,
        longitude: res.longitude,
        name: res.address
      })    
      wx.openLocation({
        latitude: res.latitude,
        longitude: res.longitude,
        name: res.name
      })
    }      
  })
},
  /**
   * 生命周期函数--监听页面显示
   */
   onShow: function(){

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
  // 分享到朋友圈
  onShareAppMessage: function () {
    return {
      title: '智慧云地摊',
      path: '/detail/detail?id=123'
    }
  }
})