var express = require('express')
var router = express.Router()
var mongoose = require('mongoose');
var Products = require('../models/product.js')
var Users = require('../models/user.js')
var Adverts = require('../models/advert.js')

mongoose.connect('mongodb://localhost/Money')

mongoose.connection.on("connected",function() {
    console.log('MongoDb connected success.')
})

mongoose.connection.on("error",function() {
    console.log('MongoDb connected error.')
})

mongoose.connection.on("disconnected",function() {
    console.log('MongoDb connected disconnected.')
})

//  封装Promise函数
router.get('/list',function(req,res,next) {
    Products.find({},function(err,products) {
        return new Promise(function(resolve,reject) {
            if(err){
                reject(next(err))
            }else{
                resolve(res.json({
                    status:"0",
                    msg:'',
                    result:products
                }))
            }
        })
    })
})

//  初始化产品购买金额 
router.get('/buyMoney',function(req,res,next) {
        var job1 =  new Promise(function(resolve,reject) {
            Products.find({},function(err,products) {
                if(err) {
                    next(err)
                }else { 
                    resolve(products)
                }
            })
        })   
        var job2 = new Promise(function(resolve,reject) {
            Users.find({},function(err,users) { 
                if(err) {
                    next (err)
                }else{
                    resolve(users)
                }
            })
        })
    Promise.all([job1,job2]).then(function(results) {
        var products = results[0]
        var users = results[1]

        var productsList = []
        var usersBuyList = []
        for(var i = 0; i < products.length; i++) {
            for(var j = 0; j < products[i].productTypeList.length; j++) {
                productsList.push(products[i].productTypeList[j])
            }
        }
        for(var i = 0; i < users.length; i++) {
            for(var j = 0; j < users[i].buyList.length; j++) {
                usersBuyList.push(users[i].buyList[j])
            }
        }

        
        for(var i = 0; i < productsList.length; i++) {
            let money = 0
            for(var j = 0; j < usersBuyList.length; j++) {    
                if(String(productsList[i]._id) == String(usersBuyList[j]._id)) {
                    money =  parseInt(money) + parseInt(usersBuyList[j].productMoney)
                    productsList[i].productMoney = money
                }
            }
        }
        
        let productTitle = []
        for(let i = 0; i < productsList.length; i++){
          if(productTitle.length == 0){
            productTitle.push( productsList[i].productName)
          }else if(productTitle.indexOf( productsList[i].productName) == -1){
              productTitle.push(productsList[i].productName)
            }
        } 
        let AllMoney = 0
        productsList.forEach((item) => {
            AllMoney = parseInt(AllMoney) + parseInt(item.productMoney)
        })

        let sevenMoney = 0
        for(var i = 0; i < usersBuyList.length; i++) {
            if(Date.now() - usersBuyList[i].boughtTime.getTime() < 7 * 24 * 3600 * 1000){
                sevenMoney = parseInt(sevenMoney) + parseInt(usersBuyList[i].productMoney)
            }
        }
        

        res.json({
            status:'0',
            msg:'',
            result:{
                allMoney:AllMoney,
                sevenMoney:sevenMoney
            }

        })
        
        for( var i = 0; i < productTitle.length; i++){
            for( var j = 0; j < productsList.length; j++){
                Products.update(
                    {"productName":productTitle[i],
                    "productTypeList._id": productsList[j]._id},
                    {"productTypeList.$.productMoney":productsList[j].productMoney,
                    },function(err){
                        if(err) {
                            next(err)
                    }
                })
            }
        }    
    }) 
})

router.get('/advert',function(req,res,next) {
    Adverts.find({},function(err,adverts) {
        if(err) {
            next()
        }else {
            res.json({
                status: '0',
                msg: '',
                result: adverts
            })
        }
    })
})


//  产品详情
router.get('/detail',function(req,res,next) {
    Products.findOne({
        "productName":req.query.name
    },function(err,products) {
        if(err) {
            next()
        }else {
            products.productTypeList.forEach((item) => {
                if(item._id == req.query.id) {
                    res.json({
                        status: '0',
                        msg: '',
                        result: item
                    })
                }
            })
        }
    })
})


// new Adverts({
//     advertId:1002,
//     advertName:'报告',
//     advertImgList:
//     {
//         L:'ad001-l',
//         M:'ad001-m',
//         S:'ad001.png'
//     }
// }).save(function(err){})

// var Products = new Products({
//     productId: 10002,
//     productName: '活期产品',
//     productInfoList:[
//         {
//             productInfo:'甄选优质基金'
//         }
//     ],
//     productInfoList:[
//         {
//             productInfo : "甄选优质基金"
//           }, {     
//             productInfo : "随时提现"
//           }, {
//             productInfo : "即取即用"
//           }
//     ],
//     productTypeList:[
//         {
//             productName : "活期产品",
//             productData : 0,
//             productRate : "0.5%",
//             productMoney : 1880
//           }, {
//             productName : "活期产品",
//             productData : 0,
//             productRate : "1.50%",
//             productMoney : 2880
//           }, {
//             productName : "活期产品",
//             productData : 0,
//             productRate : "2.50%",
//             productMoney : 3880
//           }, {
//             productName : "活期产品",
//             productData : 0,
//             productRate : "2.50%",
//             productMoney : 5880
//           }, {
//             productName : "活期产品",
//             productData : 0,
//             productRate : "3.50%",
//             productMoney : 9080
//           }
//     ]
//     })
//     Products.save(function(err,ret) {
//     if(err) {
//     console.log('保存失败')
//     }else {
//     console.log('保存成功')
//     console.log(ret)
//     }
//     })
    
module.exports = router