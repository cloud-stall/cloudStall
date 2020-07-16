class Base {
  constructor(){
    this.baseRequestUrl = "http://192.168.32.196/"
  }

  request(params){

    if(params.type){
      params.type = "GET"
    }
    var url = this.baseRequestUrl+params.url;
    wx.request({
      url:url,
      method:params.type,
      data:params.data,
      header:{
        "content-type":"application/json",
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