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
          url: 'http://192.168.33.22/weixin/getopenid',
          data: {
            code: res.code
          },
          success: (datas) => {
            console.log('tttt', datas)  
            wx.setStorageSync('token', datas.data.code)
          },
          fail(res3) {
            console.log("获取用户信息失败", res)
          }    
        })
      }
    }
      })
      wx.request({
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': wx.getStorageInfoSync('token')
              },
              url: 'http://192.168.33.22/weixin/gettoken',
              data: {
                city: e.detail.userInfo.city,
                country: e.detail.userInfo.country,
                createdate: '',
                headimgurl: e.detail.userInfo.avatarUrl,
                iphone: '1579655656',
                nickname: e.detail.userInfo.nickName,
                province: e.detail.userInfo.province
              },
              success: (data2)=>{
                console.log(data2)
                wx.setStorageSync('token', data2.data.code)
                // wx.switchTab({          
                //   url: '../index/index',
                //   success: (res)=>{
                //     console.log(res)
                //   }
                // })
              }
            })

            //
            
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