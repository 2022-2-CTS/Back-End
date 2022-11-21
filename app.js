var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var serverRouter = require('./routes/server');
var apiRouter = require('./routes/api');
var imageCrawlRouter = require('./routes/imageCrawl');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// server.js 내 API
app.use('/api/test', serverRouter);
app.use('/api/register', serverRouter);
app.use('/api/check', serverRouter);
app.use('/api/test', serverRouter);

// api.js 내 API


// imageCrawl.js 내 API


module.exports = app;
