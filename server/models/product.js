var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = new Schema({
    "productId":{type:String},
    "productName":String,
    "productInfoList":[
        {
            "productInfo":String
        }
    ],
    "productTypeList":[
        {
            "productName":String,
            "productData":String,
            "productRate":String,
            "productMoney":String,
            "productDetail":String
        }
    ]
})

module.exports = mongoose.model('Product',productSchema)