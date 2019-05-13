exports.__esModule = true;
var createError = require('http-errors');
var express = require('express');
var multer = require("multer");
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var session = require('express-session')
var logger = require('morgan');

var productRouter = require('./routes/product');
var usersRouter = require('./routes/users');


// 上传文件
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, '../money/static/');
  },
  filename: function(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
  }
})

var upload = multer({ storage: storage });
var app = express();

app.post('/uploadimg', upload.array('file', 40), function(req, res, next) {
  var files = req.files
  console.log(files)
  if (!files[0]) {
    console.log('err')
  } else {
    res.json({
      status:'0',
      msg:'上传成功',
      result: files[0].filename
    })
  }
})


app.use(session({
  //  配置加密字符串，它会再原有加密基础上和这个字符串拼接去加密
  //  目的是增加安全性，防止客户端恶意伪造
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,//  无论是否使用Session，都会默认分配一把钥匙
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

//  登录拦截
// app.use(function(req,res,next) {
//   if(req.cookies.userName) {
//     next()
//   }else{
//     if(req.path == '/products/list' || req.path == '/products/advert' || req.originalUrl == '/users/login' 
//     || req.originalUrl == '/users/register'){
//       next()
//     }else{
//       res.json({
//         status:'10001',
//         msg:'当前未登录',
//         result:''
//       })
//     }
//   }
// })


app.use('/products', productRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//  配置全局错误处理中间件
app.use(function(err,req,res,next) {
  return res.status(500).json({
    status: "1",
    msg:err.message,
    result:''
  })
})
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
