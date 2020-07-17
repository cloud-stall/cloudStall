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
        openTime: '2020-10-09',
        latitude: 23.099994,
        longitude: 113.324520
      },
      {
        id: 1002,
        picUrl:'',
        title: 'GCE贴纸套装无纺布箱子套, 和箱子',
        dis:'颜色：浅灰',
        newPrice: 10.00,
        oldPrice: 100.00,
        postTime: '2020-02-20',
        openTime: '2020-10-09',
        latitude: 23.099994,
        longitude: 113.324520
      },
      {
        id: 1003,
        picUrl:'',
        title: '正宗无锡阳山水蜜桃应季',
        dis:'味道爽口',
        newPrice: 10.00,
        oldPrice: 100.00,
        postTime: '2020-02-20',
        openTime: '2020-10-09',
        latitude: 23.099994,
        longitude: 113.324520,
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
    navIndex: 0,
    query: {},
    menuPosition: {bottom:'50rpx', top: 'auto'},
    redBottom: {bottom:0, top: 'auto'},
    mainTop:0
  },
  onLoad: function(options){
    this.getUserInfo()
  },
  onShow: function(){   
    var that = this
    wx.hideTabBar({
      animation: true
    })

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
                      borderColor: "#07c160"                     
                    }
                  }
                ]
              })
            }            
          })
  },
  // 获取类型
  getType: function(e){
    console.log(e)
    this.setData({
      typeIndex: e.currentTarget.dataset.index
    })
  },
  // 改变距离
  bindChanges: function(e){
    console.log(e)
    this.setData({     
      siteText: e.detail.value
    })
  },

  /*登录*/
  getUserInfo: function(e){
    let that = this
          wx.login({
            success (res) {
              console.log('rrr', res)
              let token1 = res.code
              if (res.code) {
                //发起网络请求
                wx.request({
                  method:'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                  },
                  url: 'http://192.168.32.230/weixin/getopenid',
                  data: {
                    code: res.code
                  },
                  success: (datas) => {
                    console.log('tttt', datas)
                    wx.getUserInfo({
                      success(res2) {              
                        app.globalData.userInfo = res.userInfo              
                        console.log("获取用户信息成功", res2)
                        that.setData({
                          name: res2.userInfo.nickName
                        })                    
                   
                    wx.request({
                      method: 'POST',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'token': datas.data.code
                      },
                      url: 'http://192.168.32.230/weixin/gettoken',
                      data: {
                        city: res2.userInfo.city,
                        country: res2.userInfo.country,
                        createdate: '',
                        headimgurl: res2.userInfo.avatarUrl,
                        iphone: '1579655656',
                        nickname: res2.userInfo.nickName,
                        province: res2.userInfo.province
                      },
                      success: (data2)=>{
                        console.log(data2)
                        wx.setStorageSync('token', data2.data.code)
                      }
                    })
                  },
                  fail(res3) {
                    console.log("获取用户信息失败", res)
                  }
                })
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
            
          })         
  },
  /*登录end*/
  // 去搜索
  goSearch: ()=>{
    wx.navigateTo({
      url: '../search/search'
    })
  },
  // 去详情
  goDetail:function(e){
    let id = e.currentTarget.dataset.id
    let latitude = e.currentTarget.dataset.latitude
    let longitude = e.currentTarget.dataset.longitude
    wx.navigateTo({
      url: '../details/details?id='+id+'&latitude='+latitude+'&logitude='+longitude,
    })
    console.log(e)
  },
  // 底部分类
  goGoodsType: function(e){
    console.log(e.currentTarget.dataset.gotypeindex)
    this.setData({
      navIndex: e.currentTarget.dataset.gotypeindex
    })
  },
  // 去顶部
  goTop: function(){
    let bottom1 = this.data.menuPosition.bottom
    let bottom2 = this.data.redBottom.bottom
console.log(bottom1, bottom2)
    if( bottom1 == '50rpx' && bottom2 == '0'){
      this.setData({
        menuPosition: {top: 0, bottom:'auto'},
        redBottom: {top: '78rpx', bottom: 'auto'},
        mainTop: '140rpx'
      })
    } else {
      this.setData({
        menuPosition: {top: 'auto', bottom:'50rpx'},
        redBottom: {top: 'auto', bottom: '0'},
        mainTop: '0'
      })
    }
    
  },
  // 去发布
  goPublist: ()=>{
    wx.switchTab({
      url: '/pages/publish/publish',
    })
  },
  // 去我的
  goMy: () => {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  onReady: function(e){
    // this.mapCtx = wx.createMapContext('myMap')
    this.data.query = wx.createSelectorQuery()
    
    console.log(this.data.query.select('.menu').boundingClientRect())
  }  
})
