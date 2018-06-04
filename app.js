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
app.use(express.static(__dirname + '/public'));


app.use('/about', aboutRouter);
app.use('/',loginRouter);
app.use('/menu',menuRouter);
app.use('/invite',inviteRouter);
app.use('/setting',settingRouter);
app.use('/map',mapRouter);
app.use('/score',scoreRouter);
app.use('/friend',friendRouter);
app.use('/gallery',galleryRouter);




<<<<<<< HEAD
      // 获取图片类型(如：image/gif 或 image/png))
      var entireData = body.toString();
      var contentTypeRegex = /Content-Type: image\/.*/;

      contentType = file['Content-Type'].substring(1);

      //获取文件二进制数据开始位置，即contentType的结尾
      var upperBoundary = entireData.indexOf(contentType) + contentType.length;
      var shorterData = entireData.substring(upperBoundary);

      // 替换开始位置的空格
      var binaryDataAlmost = shorterData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

      // 去除数据末尾的额外数据，即: "--"+ boundary + "--"
      var binaryData = binaryDataAlmost.substring(0, binaryDataAlmost.indexOf('--' + boundary + '--'));

      // 保存文件
      fs.writeFile(fileName, binaryData, 'binary', function (err) {
        console.log(err);
        // res.send('Image has been uploaded.');
      });
    } else {
      // res.send('只能上传图片文件');
    }
    
    runPython(res);

  })
})

function runPython(res) {
  console.log('Python is running')
  var spawn = require("child_process").spawn;
  var process = spawn('python3', ["./compare.py",]);
  process.stdout.on('data', function (data) {
    console.log(data.toString());
    res.send(data);
  })
}
=======
>>>>>>> develop


module.exports = app;
