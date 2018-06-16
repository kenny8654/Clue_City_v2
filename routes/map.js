let express = require('express');
let router = express.Router();
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var stylus = require('stylus');
const fs = require('fs');
const http = require('http');
const querystring = require('querystring');
const bodyParser = require('body-parser');
const urlencoderParser = bodyParser.urlencoded({ extended: false });
const multer = require('multer')

let mongoOperation = require("../../cluescity/mongo-express/main.js");
let mongoCollection = "user";

router.get('/',function(req,res){
  res.sendFile('map.html', {
    root : 'public'
  });
});

router.post('/map', urlencoderParser,function(req,res){
          
 //     mongoOperation.mongoFind( mongoCollection , req.body);
});

//配置diskStorage來控制文檔存儲的位置以及文檔名字等
var storage = multer.diskStorage({
  //確定圖片存儲的位置
  destination: function (req, file, cb){
      cb(null, '.')
  },
  //確定圖片存儲時的名字,注意，如果使用原名，可能會造成再次上傳同一張圖片的時候的衝突
  filename: function (req, file, cb){
      cb(null, Date.now()+file.originalname)
  }
});
//生成的專門處理上傳的一個工具，可以傳入storage、limits等配置
var upload = multer({storage: storage});

//接收上傳圖片請求的接口
router.post('/upload', upload.single('file'), function (req, res, next) {
  //圖片已經被放入到服務器裏,且req也已經被upload中間件給處理好了（加上了file等信息）
  console.log("Server start running....... *****************************************");
  //線上的也就是服務器中的圖片的絕對地址
  var url = '/uploadImgs/' + req.file.filename
  res.json({
      code : 200,
      data : url
  })
});




// router.post("/upload", urlencoderParser, function (req, res) {
//   req.setEncoding('binary');
//   var body = '';   // 文件数据
//   var fileName = '';  // 文件名
//   // 边界字符串
//   var boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '');
//   req.on('data', function (chunk) {
//     body += chunk;
//   });

//   req.on('end', function () {
//     var file = querystring.parse(body, '\r\n', ':')

//     // 只处理图片文件
//     if (file['Content-Type'].indexOf("image") !== -1) {
//       //获取文件名
//       var fileInfo = file['Content-Disposition'].split('; ');
//       for (value in fileInfo) {
//         if (fileInfo[value].indexOf("filename=") != -1) {
//           //fileName = fileInfo[value].substring(10, fileInfo[value].length-1);
//           fileName = "./CluesCity/target.jpg"
//           if (fileName.indexOf('\\') != -1) {
//             //fileName = fileName.substring(fileName.lastIndexOf('\\')+1);
//             fileName = "./CluesCity/target.jpg"
//           }
//           console.log("File Name : " + fileName);
//         }
//       }

//       // 获取图片类型(如：image/gif 或 image/png))
//       var entireData = body.toString();
//       var contentTypeRegex = /Content-Type: image\/.*/;

//       contentType = file['Content-Type'].substring(1);

//       //获取文件二进制数据开始位置，即contentType的结尾
//       var upperBoundary = entireData.indexOf(contentType) + contentType.length;
//       var shorterData = entireData.substring(upperBoundary);

//       // 替换开始位置的空格
//       var binaryDataAlmost = shorterData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

//       // 去除数据末尾的额外数据，即: "--"+ boundary + "--"
//       var binaryData = binaryDataAlmost.substring(0, binaryDataAlmost.indexOf('--' + boundary + '--'));

//       // 保存文件
//       fs.writeFile(fileName, binaryData, 'binary', function (err) {
//         console.log(err);
//         // res.send('Image has been uploaded.');
//       });
//     } else {
//       // res.send('只能上传图片文件');
//     }
    
//     runPython(res);

//   })
// })

// function runPython(res) {
//   console.log('Python is running')
//   var spawn = require("child_process").spawn;
//   var process = spawn('python3', ["./compare.py",]);
//   process.stdout.on('data', function (data) {
//     console.log(data.toString());
//     res.send(data.toString());
//   })
// }

module.exports = router;
