import {Base} from "../../utils/base"

let base = new Base();

class Details extends Base{
  constructor(){
    super();
  }

  getDetails(commodityid,callBack){
    var params = {
      url:"commodity/getcommodity",
      data:{
        commodityid:commodityid
      },
      type:"post",
      sCallBack:function(res){
        callBack&&callBack(res)
      }
    }
    this.request(params)
  }

  insertcollect(commodityid,callBack){
    var params = {
      url:"commodity/insertcollect",
      data:{
        commodityid:commodityid
      },
      type:"post",
      sCallBack:function(res){
        callBack&&callBack(res)
      }
    }
    this.request(params)
  }

  //是否已经收藏
  iscollect(commodityid,callBack){
    var params = {
      url:"commodity/iscollect",
      data:{
        commodityid:commodityid
      },
      type:"post",
      sCallBack:function(res){
        callBack&&callBack(res)
      }
    }
    this.request(params)
  }

  delcollect(commodityid,callBack){
    //commodity/deletecollect

    var params = {
      url:"commodity/deletecollect",
      data:{
        commodityid:commodityid
      },
      type:"post",
      sCallBack:function(res){
        callBack&&callBack(res)
      }
    }
    this.request(params)

  }




}

export {Details}