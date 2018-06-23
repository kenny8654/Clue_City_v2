var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var stylus = require('stylus');
const fs = require('fs');
const http = require('http')
const querystring = require('querystring');
const bodyParser = require('body-parser');
const urlencoderParser = bodyParser.urlencoded({ extended: false })

var loginRouter = require('./routes/login');
var aboutRouter = require('./routes/about');
var inviteRouter = require('./routes/invite');
var menuRouter = require('./routes/menu');
var settingRouter = require('./routes/setting');
var mapRouter = require('./routes/map');
var scoreRouter = require('./routes/score');
var friendRouter = require('./routes/friend');
var galleryRouter = require('./routes/gallery');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/scripts')));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/scripts'));



app.use('/about', aboutRouter);
app.use('/', loginRouter);
app.use('/menu', menuRouter);
app.use('/invite', inviteRouter);
app.use('/setting', settingRouter);
app.use('/map', mapRouter);
app.use('/score', scoreRouter);
app.use('/friend', friendRouter);
app.use('/gallery', galleryRouter);


module.exports = app;
