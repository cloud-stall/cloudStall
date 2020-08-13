import {Base} from "../../utils/base"
let base = new Base();

class AsyncData extends Base  {
  constructor(){
    super()
  }
  //http://192.168.16.68/swagger-ui.html#/
  requests(params){


   // console.log(params.type)
    if(!params.type){
      // console.log(params.type)
      params.type = "GET"
    }
    var url = this.baseRequestUrl+params.url;
    console.log(wx.getStorageSync("token"))

    return new Promise((resolve,reject)=>{
      wx.uploadFile({
        url:url,
        method:params.type,
        filePath: params.data.files,
        name: 'files',
        header:{
          "token":wx.getStorageSync("token")
        },
        success:function(res){
          resolve(res)
        },
        fail:function(err){
          reject(err)

        }
  
      })
    })
    
  }

}
export {AsyncData}