import {Base} from "../../utils/base"

let base = new Base();

class My extends Base{
  constructor(){
    super();
  }

  changeUserName(n,callBack){
    var params = {
      url:"user/ExitName",
      data:{
        name:n
      },
      type:"post",
      sCallBack:function(res){
        callBack&&callBack(res)
      }
    }
    this.request(params)
  }
}

export {My}