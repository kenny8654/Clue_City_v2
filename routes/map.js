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

router.post("/upload", urlencoderParser, function (req, res) {
  req.setEncoding('binary');
  var body = '';   // ���?�u
  var fileName = '';  // ���W
  // ?�ɦr�Ŧ�
  var boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '');
  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    var file = querystring.parse(body, '\r\n', ':')

    // �u?�z?�����
    if (file['Content-Type'].indexOf("image") !== -1) {
      //?�����W
      var fileInfo = file['Content-Disposition'].split('; ');
      for (value in fileInfo) {
        if (fileInfo[value].indexOf("filename=") != -1) {
          //fileName = fileInfo[value].substring(10, fileInfo[value].length-1);
          fileName = "./target.jpg"
          if (fileName.indexOf('\\') != -1) {
            //fileName = fileName.substring(fileName.lastIndexOf('\\')+1);
            fileName = "./target.jpg"
          }
          console.log("File Name : " + fileName);
        }
      }

      // ?��?��?��(�p�Gimage/gif �� image/png))
      var entireData = body.toString();
      var contentTypeRegex = /Content-Type: image\/.*/;

      contentType = file['Content-Type'].substring(1);

      //?�����G?��?�u?�l��m�A�YcontentType��?��
      var upperBoundary = entireData.indexOf(contentType) + contentType.length;
      var shorterData = entireData.substring(upperBoundary);

      // ��??�l��m���Ů�
      var binaryDataAlmost = shorterData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

      // �h��?�u������?�~?�u�A�Y: "--"+ boundary + "--"
      var binaryData = binaryDataAlmost.substring(0, binaryDataAlmost.indexOf('--' + boundary + '--'));

      // �O�s���
      fs.writeFile(fileName, binaryData, 'binary', function (err) {
        console.log(err);
        // res.send('Image has been uploaded.');
      });
    } else {
      // res.send('�u��W??�����');
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
    res.send(data.toString());
  })
}

module.exports = router;
