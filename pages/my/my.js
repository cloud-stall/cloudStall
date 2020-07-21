// pages/my/my.js
const app = getApp()
import {My} from "./model-my"

var my = new My();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  goMyCollection: function(){
    wx.navigateTo({
      url: '../myCollection/myCollection',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }

    // console.log(1)
    // this._loadData()

  },
  //请求数据模块
  _loadData(){
    //测试修改用户名
    my.changeUserName("testName",(res)=>{
      console.log(res)
    })
  },

  //跳转页面到修改用户名

  goChange(){
    wx.navigateTo({
      url: '../changename/changename'
    })
  },


  //进入我的店铺
  goMyShop: function(){
    wx.navigateTo({
      url: '../myshop/myshop',
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
    console.log(app.globalData.userInfo)
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
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