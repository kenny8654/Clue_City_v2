let express = require('express');
let router = express.Router();
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var stylus = require('stylus');
const fs = require('fs');
const http = require('http')
const querystring = require('querystring');
const bodyParser = require('body-parser');
const urlencoderParser = bodyParser.urlencoded({ extended: false })


let mongoOperation = require("../../cluescity/mongo-express/main.js");
let mongoCollection = "user";

router.get('/',function(req,res){
  res.sendFile('map.html', {
    root : 'CluesCity'
  });
});

router.post('/map', urlencoderParser,function(req,res){
          
 //     mongoOperation.mongoFind( mongoCollection , req.body);
});

module.exports = router;
