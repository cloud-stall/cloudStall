import {Base} from "../../utils/base"
import {AsyncData} from './asyncFn'
let base = new Base();
let asyncData = new AsyncData()

class Revise extends Base{
  constructor(){
    super();
  }

  getCurrentData(id,callBack){
    var params = {
      url:"commodity/getcommodity",
      data:{
        commodityid:id
      },
      type:"post",
      sCallBack:function(res){
        callBack&&callBack(res)
      }
    }
    this.request(params)
  }

  upDataImg(file){
    var params = {
      url:"commodity/muploadimages",
      data:{
        files:file
      },
      type:"post",
    }

   return  asyncData.requests(params)
  }
 

  // async dbFuc(arr) {
  //   console.log(arr);
  //   console.log( arr )
  //   let promises = arr.map((doc) => this.upDataImg(doc));
  //   let results = await Promise.all(promises);
  //   console.log(results); 
  //   var url=[];
  //   results.forEach((item)=>{
  //     url.push(item.data.split(",")[1])
  //   })

  //   console.log(url)
  //   console.log(this.data)
  // }

}

export {Revise}