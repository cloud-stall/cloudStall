import {Base} from "../../utils/base"

let base = new Base();

class Change extends Base{
  constructor(){
    super();
  }

  changeUserName(n,callBack){
    var params = {
      url:"user/ExitName",
      data:{
        name:n
      },
      type:"POST",
      sCallBack:function(res){
        callBack&&callBack(res)
      }
    }
   // console.log(params);
    
    this.request(params)
  }
}

export {Change}