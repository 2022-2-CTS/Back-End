var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var serverRouter = require('./routes/server');
//var apiRouter = require('./routes/api');
var postRouter = require('./routes/post');
var getDataRouter = require('./routes/getData');
var togetherRouter = require('./routes/together');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api', serverRouter); // 회원가입, 로그인
app.use('/api/board', postRouter); // info 작성
app.use('/api/together', togetherRouter); // 같이고고 작성
//app.use('/api/data', apiRouter); // 공공데이터포털 api 호출
app.use('/api/data', getDataRouter); // data 받아오기

module.exports = app;