import {MyShop} from "./modle-myshop"

var myShop = new MyShop();

// pages/myshop/myshop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myShopList:[],
    status:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyShopList()
    this.getStatu()
  },

 //getusercommodityls 获取我的商品列表
 getMyShopList:function(){
   var that = this;
  myShop.getMyShopList(function(res){
    console.log(res)
    that.setData({
      myShopList:res.data
    })

    console.log(that.data)
  })

  
 },

 //删除店铺商品

 delcomm:function(e){
   var id= e.currentTarget.dataset.id
   var that = this;
  console.log(id)
  myShop.delcomm(id,function(res){
    console.log(res)
    if(res.data.status){
      that.getMyShopList()
    }
  })
 },

 //获取店铺状态
 getStatu:function(){
   var that = this
  myShop.getstatu(function(res){
    console.log(res)
    that.setData({
      status:Boolean(res.data.status)
    })
  })

  console.log(this.data.status);
  
 },


 //打烊休息/摆摊赚钱
 setstatu:function(){
   var that = this;
   this.setData({
    status:!this.data.status
   })

   console.log(+this.data.status);
   

    myShop.setstatu(+this.data.status,function(res){
      console.log(res)
    })
 },

 //跳转修改页面
 gotorevise:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../revise/revise?id='+id,
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