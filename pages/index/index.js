//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
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
  onReady: function(e){
    this.mapCtx = wx.createMapContext('myMap')
  },
  onShow: function(){
    console.log(this.data.longitude)
    wx.getSetting({
      complete: (res) => {
        console.log(res)
        if(res.authSetting.scope.address){
          wx.getLocation({
            altitude: this.data.latitude,
            longitude: this.data.longitude
          })
        }     
      },     
  })
  }
})
