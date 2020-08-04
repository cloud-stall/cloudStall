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
}

export { MyShop }