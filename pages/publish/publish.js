// pages/publish/publish.js
import {
	Base
} from '../../utils/base'
const app = getApp()
//sdk
// var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
// var qqmapsdk;
//base
let base = new Base();
let urls = base.baseRequestUrl
let address = wx.getStorageSync('address')
let locationsNew = wx.getStorageSync('location')
console.log(address)
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		rank: ['a', 'b'],
		typeIndex: 0,
		goodsTypes: [],
		location: address,
		newPrice: 0,
		oldPrice: 0,
		time: '10:00:00',
		time2: '22:00:00',
		radioItems: [{
				value: '全新',
				checked: true,
				num: 9
			},
			{
				value: '二手',
				checked: false,
				num: 0
			}
		],
		newValue: 0,
		oldValue: [{
				id: 1,
				title: '1成新'
			},
			{
				id: 2,
				title: '2成新'
			},
			{
				id: 3,
				title: '3成新'
			},
			{
				id: 4,
				title: '4成新'
			},
			{
				id: 5,
				title: '5成新'
			},
			{
				id: 6,
				title: '6成新'
			},
			{
				id: 7,
				title: '7成新'
			},
			{
				id: 8,
				title: '8成新'
			},
			{
				id: 9,
				title: '9成新'
			}
		],
		oldindex: 0,
		goodsTextarea: '',
		images: [],
		longitude: locationsNew ? JSON.parse(locationsNew).longitude : '',
		latitude: locationsNew ? JSON.parse(locationsNew).latitude : '',
		commodityname: '',
		token: '',
		filePath: [],
		picSrc: [],
		picSrcs: '',
		imgSrc: []
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	// 选择类型
	bindchange: function(e) {
		this.setData({
			typeIndex: e.detail.value
		})
	},
	//新旧程度
	bindchangeOld: function(e) {
		console.log(e)
		console.log((e.detail.value * 1 + 1) * 10)
		this.setData({
			newValue: (e.detail.value * 1 + 1) * 10
		})
	},

	radioChange: function(e) {
		console.log(e)
		this.setData({
			newValue: (e.detail.value * 1 + 1) * 10
			// oldindex: (Number(e.detail.value)+Number(1))* 10
		})
		console.log((Number(e.detail.value)))
	},
	// 开始日期
	bindchangeTime: function(e) {
		this.setData({
			time: e.detail.value
		})
	},
	// 结束日期
	bindchangeTime2: function(e) {
		this.setData({
			time2: e.detail.value
		})
	},
	//获取位置
	getLocation(e) {
		var that = this
		wx.chooseLocation({
			success: function(res) {
				console.log(res.address)
				console.log(res.latitude)
				console.log(res.longitude)
				console.log(res.name)
				var location = res.address
				// let lat1 = that.data.latitude, lng1 = that.data.longitude
				// let s = this.getDistance(lat1,lng1,res.latitude,res.longitude)
				// if(s>5000){
				// 	showToast({
				// 		title: '已经超出有限范围，请在5000米内重新定位'
				// 	})
				// }
				that.setData({
					latitude: res.latitude,
					longitude: res.longitude,
					location: location
				})
			}
		})
	},
	goAgree: () => {
		console.log(1)
		wx.navigateTo({
			url: '../agree/agree',
		})
	},
	getName: function(e) {
		console.log(e)
		this.setData({
			commodityname: e.detail.value
		})
	},
	// 发布
	publish: function() {
		let that = this
		let commoditylogo = this.data.imgSrc[0]
		let commodityimages = this.data.images.join(',')
		console.log(commodityimages, that.data.goodsTypes[that.data.typeIndex], commoditylogo)
		
		if(that.data.commodityname == ''){
			wx.showToast({
				title: '商品名称不能为空'
			})
			return
		}
		if(that.data.goodsTypes[that.data.typeIndex].commoditytypeid == ''){
			wx.showToast({
				title: '商品类型不能为空'
			})
			return
		}
		if(that.data.location == ''){
			wx.showToast({
				title: '地址不能为空'
			})
			return
		}
		if(that.data.newPrice == ''){
			wx.showToast({
				title: '商品现价不能为空'
			})
			return
		}
		if(that.data.oldPrice == ''){
			wx.showToast({
				title: '商品原价不能为空'
			})
			return
		}
		if(that.data.picSrcs == ''){
			wx.showToast({
				title: '商品图片不能为空'
			})
			return
		}
		
		let obj = {
			commodityname: that.data.commodityname,
			commoditytypeid: that.data.goodsTypes[that.data.typeIndex].commoditytypeid,
			address: that.data.location,
			commodityprice: that.data.newPrice,
			commodityoriginal: that.data.oldPrice,
			bigtime: that.data.time,
			endtime: that.data.time2,
			commoditydetails: that.data.goodsTextarea, // 商品描述
			commodityimages: that.data.picSrcs,
			latitude: that.data.latitude,
			longitude: that.data.longitude,
			commodityoldandnew: that.data.newValue,
			commoditylogo: commoditylogo
		}
		
		console.log(obj)
		wx.getStorage({
			key: 'token',
			success(res) {
				console.log(res.data)
				that.setData({
					token: res.data
				})
				console.log(that.data.token)

				wx.request({
					url: urls + 'commodity/multifileUpload',
					// filePath: that.data.filePath,
					// name: 'files',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'token': that.data.token
					},
					method: 'POST',
					data: obj,
					success(res) {
						console.log(res.data)
						let status = res.data.status
						if (status) {
							wx.showToast({
								title: '商品发布成功'
							})
							wx.navigateTo({
								url: '../myshop/myshop'
							})
						}
					},
					fail(esr) {
						console.log(esr)
					}
				})
			}
		})
		// }
	},
	//获取现价
	getNewPrice: function(e) {
		this.setData({
			newPrice: e.detail.value
		})
	},
	//获取原价
	getoldPrice: function(e) {
		this.setData({
			oldPrice: e.detail.value
		})
	},
	//获取商品描述
	getTextarea: function(e) {
		this.setData({
			goodsTextarea: e.detail.value
		})
	},
	//上传图片
	uploadPic: function(e) {
		let that = this
		wx.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				const tempFilePaths = res.tempFilePaths
				const images = that.data.images.concat(res.tempFilePaths)
				that.data.images = images.length <= 9 ? images : images.slice(0, 9)
				console.log('tttt', res, tempFilePaths, images)
				for (var i = 0; i < res.tempFilePaths.length; i++) {
					var imgUrl = res.tempFilePaths[i];
					wx.uploadFile({
						url: urls + 'commodity/muploadimages', //仅为示例，非真实的接口地址
						filePath: that.data.images[i],
						name: 'files',
						header: {
							'token': wx.getStorageSync('token')
						},
						formData: {

						},
						success(res) {
							const data = res.data
							//do something
							// that.data.picSrc += JSON.parse(res.data).msg + ','
							// this.data.picSrc.push(JSON.parse(res.data).msg)				
							that.data.imgSrc.push(JSON.parse(res.data).msg)
							console.log(that.data.imgSrc)
							that.setData({
								// picSrc: that.data.picSrc,
								imgSrc: that.data.imgSrc
							})
							let picSrcs = that.data.imgSrc.join(',')
							that.setData({
								picSrcs: picSrcs
							})
						}
					})
				}
			}
		})

	},
	// 根据经纬度计算两点之间的距离
	getDistance: function(lat1, lng1, lat2, lng2) {

		lat1 = lat1 || 0;
		lng1 = lng1 || 0;
		lat2 = lat2 || 0;
		lng2 = lng2 || 0;

		var rad1 = lat1 * Math.PI / 180.0;
		var rad2 = lat2 * Math.PI / 180.0;
		var a = rad1 - rad2;
		var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

		var r = 6378137;
		return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(
			b / 2), 2)))
	},
	// 图片预览
	imagePreview(e) {
		console.log(e)
		let currentUrl = e.currentTarget.dataset.src
		wx.previewImage({
			current: currentUrl, // 当前显示图片的http链接
			urls: this.data.imgList // 需要预览的图片http链接列表
		})
	},
	// 删除图片
	delImg: function(e) {
		let that = this
		console.log(e)
		let index = e.currentTarget.dataset.index

		console.log(index, that.data.imgSrc)
		wx.showModal({
			title: '确定要删除图片吗？',
			success() {
				wx.request({
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded', // 默认值
						'token': wx.getStorageSync('token')
					},
					url: urls + 'commodity/delimage',
					data: {
						imagepath: e.currentTarget.dataset.img
					},
					success: res => {
						console.log(res)
						if (res.data.status == 1) {
							that.data.imgSrc.splice(index, 1)
							console.log(that.data.imgSrc)
							that.setData({
								imgSrc: that.data.imgSrc
							})
							showToast: {
								title: '删除成功'
							}
						} else {
							showToast: {
								title: '删除错误'
							}
						}
						let picSrcs = that.data.imgSrc.join(',')
						that.setData({
							picSrcs: picSrcs
						})

					}

				})
			}
		})
	},
	// 手机号授权
	// getPhone: function(){
	//    let phone = wx.getStorageSync('phone')
	//   console.log(phone)
	//   if(!phone){
	//     console.log(phone)
	//     wx.navigateTo({
	//       url: '../regist2/regist2',
	//     })
	//   } else{
	//     return
	//   }
	// },
	// 获取类型
	getTypes: function() {
		console.log(2)
		let that = this
		wx.request({
			method: 'POST',
			url: urls + '/commoditytype/commoditytypelist',
			header: {
				'content-type': 'application/x-www-form-urlencoded', // 默认值
				'token': wx.getStorageSync('token')
			},
			data: {},
			success: function(res) {
				console.log(res)
				that.setData({
					goodsTypes: res.data
				})
			}
		})
	},
	onLoad: function(options) {
		this.getTypes()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		// qqmapsdk.search({
		//   keyword: '地摊',
		//   success: function (res) {
		//       console.log(res);
		//   },
		//   fail: function (res) {
		//       console.log(res);
		//   },
		//   success: function (res) {
		//       console.log(res);
		//   }
		// })
		this.getTypes()
		wx.showTabBar({
			animation: true
		})
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
