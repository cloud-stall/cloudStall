//index.js
//获取应用实例
const app = getApp()
import {Base} from '../../utils/base'
let base = new Base();
let urls = base.baseRequestUrl;
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
    qqmapsdk = new QQMapWX({
      key: 'key'
    });  

Page({
  data: {
    // 距离
    site: ['0.5', '1', '2', '3', '4', '5'],
    siteText: '0.5',
    typeIndex: 0,
    // 筛选分类
    type:['云摊位','综合','销量','服务'],
    latitude: 0,
    longitude: 0,
    mapDatas: [],
    markers: [],
    covers: [],
	goodsList:[],
    // 商品列表
    // goodsList: [
    //   {
    //     id: 1001,
    //     picUrl:'',
    //     title: '扬州新鲜荔枝',
    //     dis:'味的甜蜜',
    //     newPrice: 10.00,
    //     oldPrice: 100.00,
    //     postTime: '2020-02-20',
    //     openTime: '2020-10-09',
    //     latitude: 23.099994,
    //     longitude: 113.324520
    //   },
    //   {
    //     id: 1002,
    //     picUrl:'',
    //     title: 'GCE贴纸套装无纺布箱子套, 和箱子',
    //     dis:'颜色：浅灰',
    //     newPrice: 10.00,
    //     oldPrice: 100.00,
    //     postTime: '2020-02-20',
    //     openTime: '2020-10-09',
    //     latitude: 23.099994,
    //     longitude: 113.324520
    //   },
    //   {
    //     id: 1003,
    //     picUrl:'',
    //     title: '正宗无锡阳山水蜜桃应季',
    //     dis:'味道爽口',
    //     newPrice: 10.00,
    //     oldPrice: 100.00,
    //     postTime: '2020-02-20',
    //     openTime: '2020-10-09',
    //     latitude: 23.099994,
    //     longitude: 113.324520,
    //   }
    // ],
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
    // this.getUserInfo()
    this.getGoods()
  },
  onShow: function(){  
    this.getGoods()
    var that = this
    wx.hideTabBar({
      animation: true
    })
//   wx.getLocation({
// 	type: 'gcj02',
// 	success: (res2)=>{
// 	  console.log(res2, that.data.longitude)
// 	  wx.setStorageSync('location', JSON.stringify({latitude: res2.latitude,
// 		longitude: res2.longitude}))
// 	  that.setData({
// 		latitude: res2.latitude,
// 		longitude: res2.longitude,
// 		markers: [{
// 		  id: 1,
// 		  latitude: res2.latitude,
// 		  longitude: res2.longitude,
// 		  iconPath: '/imgs/icon.png',
// 		  callout:{
// 			content:"服务:青少年英语培训\r\n姓名:陶士涵\r\n电话:18808987876",
// 			bgColor:"#ffffff",
// 			padding:"5px",
// 			borderRadius:"2px",
// 			borderWidth:"1px",
// 			borderColor:"#07c160",
// 		  }
// 		},
// 		  {
// 			id: 2,
// 			latitude: res2.latitude-0.001,
// 			longitude: res2.longitude,
// 			iconPath: '/imgs/icon.png',
// 			callout: {
// 			  content: "服务:出租龙兴园西区9号楼二单元501\r\n姓名:陶士涵\r\n电话:18808987876",
// 			  bgColor: "#ffffff",
// 			  padding: "5px",
// 			  borderRadius: "2px",
// 			  borderWidth: "1px",
// 			  borderColor: "#07c160"                     
// 			}
// 		  }
// 		]
// 	  })
// 
// 	  // 获取当前位置
// 	  qqmapsdk.reverseGeocoder({
// 		location: {latitude: res2.latitude,longitude: res2.longitude},
// 		success: function (res) {
// 		  //address 城市
// 		  that.setData({ address: res.result.address_component.city})
// 		  wx.showToast({
// 			title: `当前位置： ` + that.data.address,
// 			icon: 'none'
// 		  });          
// 		}
// 	  });
// 
// 	}            
//   })
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
    this.getGoods()
  },
  // 获取商品
  getGoods: function(e){
    let that = this
    console.log(this.data.latitude)
    wx.getStorage({
      key: 'location',
      success (res) {
        console.log(res,JSON.parse(res.data).latitude,JSON.parse(res.data).longitude)
        that.setData({
          latitude: JSON.parse(res.data).latitude,
          longitude: JSON.parse(res.data).longitude
        })
      console.log(that.data.latitude, that.data.longitude)
      let index = that.data.siteText.indexOf('k')      
      let siteText = (that.data.siteText.slice(0, index) * 1000).toString()
      console.log(that.data.siteText, index)

      wx.request({
        url: urls+'/commodity/getcommodityls',
        method: 'POST',
        data: {
          lat: that.data.latitude - 0.1,
          lng: that.data.longitude - 0.2,
          distance: (Number(that.data.siteText)*1000).toString()
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'token': wx.getStorageSync('token')
        },
        success: function(res){
          // 商品列表
		  let dataList = res.data.dataList
		  console.log('dataList', dataList)
		  // let map数据
		  let markers = []
		  dataList.forEach(item => {
			  markers.push({
					id: item.commodityid,
					latitude: item.latitude,
					longitude: item.longitude,
					iconPath: '/imgs/icon.png',
					callout: {
					  content: item.commoditydetails,
					  bgColor: "#ffffff",
					  padding: "5px",
					  borderRadius: "2px",
					  borderWidth: "1px",
					  borderColor: "#07c160"                     
					}
			  })
		  })
		  console.log(markers)
		  that.setData({
			  goodsList: dataList,
			  markers: markers
		  })
           //隐藏loading 提示框
           wx.hideLoading();
           //隐藏导航条加载动画
           wx.hideNavigationBarLoading();
           //停止下拉刷新
           wx.stopPullDownRefresh();
        }
      })
      }
    })
  },
  /*时间戳*/
  formateDate: function(date){
	 
  },
  /*登录*/

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
      url: '../details/details?id='+id+'&latitude='+latitude+'&longitude='+longitude,
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
        redBottom: {top: '70rpx', bottom: 'auto'},
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
  },
  // 分享到朋友圈
  onShareAppMessage: function () {
    return {
      title: '智慧云地摊',
      path: '/index/index?id=123'
    }
  },
  // 刷新
  onRefresh(){
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading(); 
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.getGoods();
  },
  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
      //调用刷新时将执行的方法
    this.onRefresh();
  }
})
