//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 距离
    site: ['0.5km', '1km', '2km', '3km', '4km', '5km'],
    siteText: '0.5km',
    typeIndex: 0,
    // 筛选分类
    type:['云摊位','综合','销量','服务'],
    latitude: 0,
    longitude: 0,
    mapDatas: [],
    markers: [],
    covers: [],
    // 商品列表
    goodsList: [
      {
        id: 1001,
        picUrl:'',
        title: '扬州新鲜荔枝',
        dis:'味的甜蜜',
        newPrice: 10.00,
        oldPrice: 100.00,
        postTime: '2020-02-20',
        openTime: '2020-10-09'
      },
      {
        id: 1002,
        picUrl:'',
        title: 'GCE贴纸套装无纺布箱子套, 和箱子',
        dis:'颜色：浅灰',
        newPrice: 10.00,
        oldPrice: 100.00,
        postTime: '2020-02-20',
        openTime: '2020-10-09'
      },
      {
        id: 1003,
        picUrl:'',
        title: '正宗无锡阳山水蜜桃应季',
        dis:'味道爽口',
        newPrice: 10.00,
        oldPrice: 100.00,
        postTime: '2020-02-20',
        openTime: '2020-10-09'
      }
    ],
    goodsTypeList: [
      {name:'全部'},
      {name:'水果'},
      {name:'小家电'},
      {name:'家居'},
      {name:'日用'},
      {name:'电器'},
      {name:'盆栽'},
      {name:'五金'}
    ],
    navIndex: 0
  },
  getType: function(e){
    console.log(e)
    this.setData({
      typeIndex: e.currentTarget.dataset.index
    })
  },
  bindChanges: function(e){
    console.log(e)
    this.setData({     
      siteText: e.detail.value
    })
  },
  onShow: function(){
   
    var that = this
    wx.getSetting({
      complete: (res) => {
        console.log(res)
        if(res.authSetting['scope.address']){
          wx.getLocation({
            type: 'gcj02',
            success: (res2)=>{
              console.log(res2.longitude, that.data.longitude)
              that.setData({
                latitude: res2.latitude,
                longitude: res2.longitude,
                markers: [{
                  id: 1,
                  latitude: res2.latitude,
                  longitude: res2.longitude,
                  iconPath: '/imgs/icon.png',
                  callout:{
                    content:"服务:青少年英语培训\r\n姓名:陶士涵\r\n电话:18808987876",
                    bgColor:"#ffffff",
                    padding:"5px",
                    borderRadius:"2px",
                    borderWidth:"1px",
                    borderColor:"#07c160",
                  }
                },
                  {
                    id: 2,
                    latitude: res2.latitude-0.001,
                    longitude: res2.longitude,
                    iconPath: '/imgs/icon.png',
                    callout: {
                      content: "服务:出租龙兴园西区9号楼二单元501\r\n姓名:陶士涵\r\n电话:18808987876",
                      bgColor: "#ffffff",
                      padding: "5px",
                      borderRadius: "2px",
                      borderWidth: "1px",
                      borderColor: "#07c160",
                     
                    }
                  }
                ]
              })
            }            
          })
        }     
      },     
  })
  },
  goSearch: ()=>{
    wx.navigateTo({
      url: '../search/search'
    })
  },
  goDetail:function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../details/details?id='+id,
    })
    console.log(e)
  },
  goGoodsType: function(e){
    console.log(e.currentTarget.dataset.gotypeindex)
    this.setData({
      navIndex: e.currentTarget.dataset.gotypeindex
    })
  },
  goPublist: ()=>{
    wx.switchTab({
      url: '/pages/publish/publish',
    })
  },
  onReady: function(e){
    this.mapCtx = wx.createMapContext('myMap')
  }
   
})
