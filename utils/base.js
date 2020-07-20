class Base {
  constructor(){
    this.baseRequestUrl = "http://192.168.33.22/"
  }

  request(params){
   // console.log(params.type)
    if(!params.type){
     // console.log(params.type)
      params.type = "GET"
    }
    
    var url = this.baseRequestUrl+params.url;
    wx.request({
      url:url,
      method:params.type,
      data:params.data,
      header:{
        "content-type":"application/x-www-form-urlencoded",
        "token":wx.getStorageSync("token")
      },
      success:function(res){
        params.sCallBack&&params.sCallBack(res)
      },
      fail:function(err){
        params.fail&&params.fail(err)
        console.log(err);
        
      }

    })
  }
  


}

export {Base}