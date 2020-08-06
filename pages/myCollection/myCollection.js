// pages/myshop/myshop.js
const app =  getApp()
import {MyCollection} from "./model-collection"
let my = new MyCollection()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList:[
      {
      bigtime: "14:00:00",
      commoditydetails: "dioasofuqwesdafewqrwq",
      commodityid: 10,
      commodityimages: "http://file.rongdukj.com/yunditan/tbAOVrvi.jpg",
      commoditylogo: "http://file.rongdukj.com/yunditan/SiQMcvlogo宽.jpg",
      commodityname: "dddfsdfasv",
      commoditytypeid: 1,
      endtime: "17:00:00"
    },
    {
      bigtime: "14:00:00",
      commoditydetails: "dioasofuqwesdafewqrwq",
      commodityid: 11,
      commodityimages: "http://file.rongdukj.com/yunditan/tbAOVrvi.jpg",
      commoditylogo: "http://file.rongdukj.com/yunditan/SiQMcvlogo宽.jpg",
      commodityname: "dddfsdfasv",
      commoditytypeid: 1,
      endtime: "17:00:00"
    },
    {
      bigtime: "14:00:00",
      commoditydetails: "dioasofuqwesdafewqrwq",
      commodityid: 12,
      commodityimages: "http://file.rongdukj.com/yunditan/tbAOVrvi.jpg",
      commoditylogo: "http://file.rongdukj.com/yunditan/SiQMcvlogo宽.jpg",
      commodityname: "dddfsdfasv",
      commoditytypeid: 1,
      endtime: "17:00:00"
    }

]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getCollection()
  },

  getCollection:function(){
    let that = this
    my.getCollectlist(function(res){
      console.log(res)
      if(res.statusCode==200){
        that.setData({collectList:res.data})
        console.log(that.data.collectList)
      }
    }) 
  },



  //取消收藏

  removeCollect(e){
    let that = this
    var ip = e.currentTarget.dataset.id;
    console.log(ip)
    my.removeCollection(ip,function(res){
     //取消收藏后 重新加载页面
      console.log(that.data.collectList)
      if(res.data.status){
        that.getCollection()
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
    wx.showTabBar({
      animation: true
    })

    this.getCollection()
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