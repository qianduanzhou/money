var express = require('express');
var router = express.Router();
var Users = require('../models/user.js')
var Products = require('../models/product.js')


//  json函数封装
function resultJson(res,status,msg,result){
  res.json({
    status:status,
    msg:msg,
    result:result
  })
}


//  注册功能
//  封装Promise函数
router.post('/register', function(req, res, next) {
  let userName = req.body.userName
  let password = req.body.password
  function job(err,user){
    return new Promise(function(resolve,reject) {
      if(err) {
        reject(err)
      }else{
        resolve(user)
      }
    })
  }
  function job2(result){
    return new Promise(function(resolve,reject) {
      if(result) {
        resultJson(res,'2','帐号已存在','')
      }else{
        resolve()
      }
    })
  }
  function job3(){
    return new Promise(function(resolve,reject) {
      new Users({
        userId: Math.floor(Math.random()*1000+10000),
        userName:userName,
        userPwd:password
      }).save(function(err) {
        if(err) {
          reject(err) 
        }else{
          resultJson(res,'0','注册成功','')
        }
      })
    })
  }

  Users.findOne({
    userName:userName
  },function(err,user){
    job(err,user).then(job2).then(job3).catch(function(err){
      next(err)
    })
  })
})

//  登录功能
router.post('/login',function(req,res,next) {
  let userName = req.body.userName
  let password = req.body.password
  function job(err,user){
    return new Promise(function(resolve,reject) {
      if(err) {
        reject(err)
      }else {
          resolve(user)
      }
    })
  }
  var job2 = function(user){
      if(user) {
        res.cookie('userId',user.userId,{
          path:'/',
          maxAge:1000*60*60*24,
        });
        res.cookie('userName',user.userName,{
          path:'/',
          maxAge:1000*60*60*24
        });
        req.session.user = user
        let result = {
          userName : user.userName,
          password : user.userPwd,
          type:user.type
        }
        resultJson(res,'0','登录成功',result)
      }else{
        resultJson(res,'2','帐号或密码错误','')
      }
  }

  Users.findOne({
    userName:userName,
    userPwd:password
  },function(err,user) {
    job(err,user).then(job2).catch(function(err){
      next(err)
    })
  })
})

//  检查登录功能
router.get('/checkLogin',function(req,res,next) {
  if(req.cookies.userName) {
    let result = req.cookies.userName || ''
    resultJson(res,'0','帐号已登录',result)
  }else{
    resultJson(res,'0','帐号未登录','')
  }
})

//  退出功能实现
router.get('/logout',function(req,res,next) {
  res.cookie('userId',"",{
    path:'/',
    maxAge:-1,
  });
  res.cookie('userName',"",{
    path:'/',
    maxAge:-1
  });
  delete req.session.user
  res.json({
    status:"0",
    msg:'',
    result:''
  })
})

//  购买功能实现
router.post('/buy',function(req,res,next) {
  let userName = req.cookies.userName
  let productName = req.body.productName
  let productId = req.body.productId
  let productMoney = parseInt(req.body.productMoney)

  job(userName).then(job2).then(job3).catch(function(err){
    next(err)
  })

   function job(userName){
    return new Promise(function(resolve,reject) {
      if(!userName){
        resultJson(res,'2','用户未登录','')
    }else{
      Users.findOne({
        userName:userName
      },function(err,user) {
        if(err){
        reject(err)
      }else{
        resolve(user)
      }
      })
    }
    })
  }

  function job2(user) {
    return new Promise(function(resolve,reject){
      if(user) {
        let productItem = ''
            user.buyList.forEach(function(item) {
              if(item._id == productId){
              productItem = item
              item.productMoney = parseInt(item.productMoney) + parseInt(productMoney)
            }
            })
            if(productItem) {
              user.save(function(err){
                if(err) {
                  reject(err)
                }else {
                  resultJson(res,'0','购买成功','')
              }
              })
            }else {
              resolve(user)
         }
      }
    }) 
  }

  function job3(user) {
    return new Promise(function(resolve,reject) {
      Products.findOne({
        productName:productName
      },function(err,product) {
        if(err) {
          reject(err)
        }else{
          if(product) {
            let products = ''
            product.productTypeList.forEach(function(item) {
              if(item._id == productId){
              item.productMoney = productMoney
              products = item
            }
            }) 
            user.buyList.push(products)
            
            user.save(function(err) {
              if(err){
                next(err)
              }else{
                resultJson(res,'0','购买成功','')
              }
            })
          }
        }
      })
    })
  }
})

//  已买产品列表
router.get('/buyList',function(req,res,next) {
  let productName = req.query.productName
  let userName = req.cookies.userName
  if(!userName){
    resultJson(res,'2','用户未登录','')
  }else{
  Users.findOne({userName:userName},function(err,user) {
    if(err) {
      next()
    }else{
      if(user) {
        let productTitle = []
        for(let i = 0; i < user.buyList.length; i++){
          if(productTitle.length == 0){
            productTitle.push(user.buyList[i].productName)
          }else if(productTitle.indexOf(user.buyList[i].productName) == -1){
              productTitle.push(user.buyList[i].productName)
            }
        }  
        let productList = user.buyList.filter(function(item){
          if(item.productName == productName || productName == 'all'){
            return item
          }
        })
        let result = {
          productList,
          productTitle
        }
        resultJson(res,'0','',result)
      }
    }
  })
}
})

//  个人中心页面
router.get('/person',function(req,res,next){
  let userName = req.query.userName
  Users.findOne({
    userName:userName
  },function(err,user) {
    if(err) {
      next()
    }else {
      if(user) {
        let result = {
          userName : user.userName,
          userPwd : user.userPwd,
          name : user.name,
          age : user.age,
          sex : user.sex,
          birth : user.birth,
          address : user.address,
          picture : user.picture,
          phone : user.phone
        }
        resultJson(res,'0','',result)
      }
    }
  })
})

//  用户信息修改
router.post('/modify',function(req,res,next) {
  let userName = req.body.userName,
  userPwd = req.body.userPwd,
  name = req.body.name ,
  age = req.body.age,
  sex = req.body.sex,
  birth = req.body.birth,
  address = req.body.address,
  picture = req.body.picture,
  phone = req.body.phone
  Users.findOne({
    userName:userName
  },function(err,user) {
    if(err) {
      next()
    }else {
      if(user) {
        user.userName = userName,
        user.userPwd = userPwd,
        user.name = name ,
        user.age = age,
        user.sex = sex,
        user.birth = birth,
        user.address = address,
        user.picture = picture,
        user.phone = phone
        user.save(function(err){
          if(err) {
            next()
          }else{
            resultJson(res,'0','修改成功','')
          }
        })
      }
    }
  })
})
module.exports = router;
