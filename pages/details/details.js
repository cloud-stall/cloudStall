// pages/details/details.js
import {Details} from "./model-details"

var myDetails = new Details();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    site: ['0.5km', '1km', '2km', '3km', '4km', '5km'],
    latitude: 0,
    longitude: 0,
    markers: [],
    covers: [],
    banner:[],
    shopName:"",
    uname:"",
    iscollect:false,
    id:"",
    price:6,
    where:"南口西大桥",
    stiartTime:"",
    endTime:"",
    dicText:"菜心虽一年四季均有",
    iphone:"15330227957",
    wxNum:"15330227957",
    condition:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =  this
    console.log(options)  //获取页面传参
    let id = options.id
    let longitude = options.longitude
    let latitude = options.latitude
    this.setData({
      id,
      latitude:latitude,
      longitude:longitude
    })

    //调用详情页数据
    console.log(this.data.id);
    
    this.getDetailData(20)
    // map
    
    wx.getSetting({
      complete: (res) => {
        console.log(res)
        if(res.authSetting['scope.userLocation']){
          wx.getLocation({
            type:'wgs84',
            success: function(res2){
              console.log(res2)
              that.setData({
                latitude: res2.latitude,
                longitude: res2.longitude 
              })            
            }
          })
        }     
      },     
  })
  },


  //请求详情页数据
  getDetailData:function(id){
    var that = this;

    //判断是否已收藏
    myDetails.iscollect(id,function(res){
      console.log(res)
      if(res.data.status){
        that.setData({
          isCollect:true
        })
      }else{
        that.setData({
          isCollect:false
        })
      }
      
    })
    myDetails.getDetails(id,function(res){
      console.log(res);
      that.setData({
        latitude: res.data.latitude,
        longitude: res.data.longitude ,
        banner: res.data.commodityimages.split(","),
        shopName:res.data.commodityname,
        uname:res.data.uname,
        price:res.data.commodityprice,
        where:res.data.address,
        stiartTime:res.data.bigtime,
        endTime:res.data.endtime,
        dicText:res.data.commoditydetails,
        iphone:res.data.iphone,
        wxNum:res.data.nickname
      }) 

      if(res.data.commodityoldandnew==100){
        that.setData({
          condition:"全新"
        })
      }else if(res.data.commodityoldandnew>=90&&res.data.commodityoldandnew<100){
        that.setData({
          condition:"9成新"
        })
      }else if(res.data.commodityoldandnew>80&&res.data.commodityoldandnew<90){
        that.setData({
          condition:"8成新"
        })
      }else{
        that.setData({
          condition:"旧货"
        })
      }
      
      console.log(that.data)

    })
  },
  //添加收藏
  insertOrDelCollect:function(e){
    console.log(e)
    var that = this
    let id = this.data.id;
    console.log(id)
    if(id){
      id=20;
    }

    if(!this.data.isCollect){
      myDetails.insertcollect(id,function(res){
        console.log(res)
        if(res.data.status==1){
          that.setData({
            isCollect:true
          })
        }
      })

    }else{
      //取消收藏
      myDetails.delcollect(id,function(res){
        console.log(res)
        if(res.data.status==1){
          that.setData({
            isCollect:false
          })
        }
      })

    }
    

    
  },


  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
goHere: function(){
  let that = this
  //选择地图
  wx.chooseLocation({
    success: function(res){
      console.log(res)
      that.setData({
        latitude: res.latitude,
        longitude: res.longitude,
        name: res.address
      })    
      wx.openLocation({
        latitude: res.latitude,
        longitude: res.longitude,
        name: res.name
      })
    }      
  })
},
  /**
   * 生命周期函数--监听页面显示
   */
   onShow: function(){

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