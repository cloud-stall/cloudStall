import {Base} from "../../utils/base"

let base = new Base();

class MyCollection extends Base{
  constructor(){
    super();
  }

  getCollectlist(callBack){
    var params = {
      url:"commodity/collectlist",
      type:"GET",
      sCallBack:function(res){
        callBack&&callBack(res)
      }
    }
    this.request(params)
  }

  removeCollection(id,callback){
    console.log(id)
    var params = {
      url:"commodity/deletecollect",
      type:"POST",
      data:{
        commodityid:id
      },
      sCallBack:function(res){
        callback&&callback(res)
      }
    }
    this.request(params)
  }

}

export {MyCollection}