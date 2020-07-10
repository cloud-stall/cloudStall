// pages/regist/regist.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getUserInfo: function(e){
    let that = this
    wx.getSetting({
      success(res){       
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success(res) {
              console.log('res',res)
              app.globalData.userInfo = res.userInfo
              
              console.log("获取用户信息成功", res, app.globalData)
              that.setData({
                name: res.userInfo.nickName
              })
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
          wx.login({
            success (res) {
              console.log(res)
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: '../../index',
                  data: {
                    code: res.code
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          }),
          wx.navigateTo({
            url: '../regist2/regist2',
            success: (res)=>{
              console.log(res)
            }
          })
        }
      }
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