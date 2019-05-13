var mongoose = require('mongoose')
var Schema = mongoose.Schema


var userSchema = new Schema({
    "userId":{ type:String, default:''},
    "userName":{ type:String, required:true},
    "userPwd":{ type:String, required:true},
    "name":{ type:String, default:''},
    "age":{ type:String, default:''},
    "sex":{ type:String, default:''},
    "birth":{ type:String, default:''},
    "address":{ type:String, default:''},
    "picture":{ type:String, default:''},
    "phone":{ type:String, default:''},
    "type":{ type:Number, default:''},
    "buyList":[
        {
            "productName":String,
            "productData":String,
            "productRate":String,
            "productMoney":String,
            "boughtTime":{type:Date,default:Date.now()}
        }
    ]
})

module.exports = mongoose.model("User",userSchema)