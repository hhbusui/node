var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
// 连接数据库
var mongoose = require('./config/mongodb');
var db = mongoose();



// view engine setup
app.set('views', path.join(__dirname, 'views'));

// app.set('view engine', 'ejs');
// // 设置html引擎
// app.engine('html', ejs.__express);
// // 设置视图引擎
// app.set('view engine', 'html');

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({//session持久化配置
    secret: "test",
    key: "test",
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//超时时间
    saveUninitialized: true,
    resave: false,
}));


app.use('/', indexRouter);
app.use('/index', indexRouter);
// app.use('/users', usersRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
