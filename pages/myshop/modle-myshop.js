import {Base} from "../../utils/base"

var base = new Base();

class MyShop extends Base{
  constructor(){
    super()
  }

  getMyShopList(callBack){
    var params = {
      url:"commodity/getusercommodityls",
      type:"post",
      sCallBack:function(res){
        callBack&&callBack(res)
      }
    }
    this.request(params)
  }
  delcomm(id,callBack){
    var params = {
      url:"commodity/delcomm",
      type:"post",
      data:{
        commodityid:id
      },
      sCallBack:function(res){
        callBack&&callBack(res)
      }
    }
    this.request(params)
  }
//user/setstatu
  setstatu(status,callBack){
    var params = {
      url:"user/setstatu",
      type:"post",
      data:{
        status:status
      },
      sCallBack:function(res){
        callBack&&callBack(res)
      }
    }
    this.request(params)
  }

  //commodity/delcomm
}

export { MyShop }