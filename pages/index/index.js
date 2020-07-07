//index.js
//获取应用实例
const app = getApp()

Page({
  onReady: function(e){
    this.mapCtx = wx.createMapContext('myMap')
  }
})
