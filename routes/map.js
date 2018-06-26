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
var teamname = null;
var clue_index;

let mongoOperation = require("../../cluescity/mongo-express/main.js");
let mongoCollection = "user";

var null_response;

router.get('/', function (req, res) {
  res.sendFile('map.html', {
    root: 'public'
  });
});

router.post('/map', urlencoderParser, function (req, res) {

  //     mongoOperation.mongoFind( mongoCollection , req.body);
});

// //配置diskStorage來控制文檔存儲的位置以及文檔名字等
// var storage = multer.diskStorage({
//   //確定圖片存儲的位置
//   destination: function (req, file, cb){
//       cb(null, '.')
//   },
//   //確定圖片存儲時的名字,注意，如果使用原名，可能會造成再次上傳同一張圖片的時候的衝突
//   filename: function (req, file, cb){
//       cb(null, Date.now()+file.originalname)
//   }
// });
// //生成的專門處理上傳的一個工具，可以傳入storage、limits等配置
// var upload = multer({storage: storage});

// //接收上傳圖片請求的接口
// router.post('/upload', upload.single('file'), function (req, res, next) {
//   //圖片已經被放入到服務器裏,且req也已經被upload中間件給處理好了（加上了file等信息）
//   console.log("Server start running....... *****************************************");
//   //線上的也就是服務器中的圖片的絕對地址
//   var url = '/uploadImgs/' + req.file.filename
//   res.json({
//       code : 200,
//       data : url
//   })
//   res.send();
// });

router.post('/NULL', function (req, res) {

  // setTimeout(function () {
  //   res.status(200).send('Success!');
  //   res.redirect('./map');
  // }, 5000);  
  // // res.status(200).send('Success!');
  // // res.redirect('./map')
  // // console.log('redirect');
});

router.post("/team", urlencoderParser, function (req, res) {
  teamname = req.body.name;
})

router.post("/return_teamname", urlencoderParser, function (req, res) {
  res.send(teamname);
})

router.post("/runPython", urlencoderParser, function (req, res) {
  clue_index = req.body.clueIndex;
  console.log(req.body);
  console.log('Python' + clue_index + ' is running')
  var spawn = require("child_process").spawn;
  var process = spawn('python3', ["./compare" + clue_index + ".py",]);
  process.stdout.on('data', function (data) {
    console.log(data.toString());
    res.send(data.toString());
  })
})

router.post("/createAlbum", urlencoderParser, function (req, res) {
  ID = req.body.ID;
  var dir = './public/' + ID;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  let message = req.body.message;
  let image_size;
  let mongoCollection = "user";
  console.log("facebookID : ");
  console.log(ID);
  let object = mongoOperation.GetFriend(mongoCollection, { id: ID });
  object.then((value) => {
    console.log("value : ");
    console.log(value);
    if (value.image == null) {
      image_size = 0;
    }
    else {
      image_size = value.image.length;
    }
    console.log("imageSize : ");
    console.log(image_size);
    fs.createReadStream('./public/target.jpg').pipe(fs.createWriteStream(dir + '/' + image_size + '.jpg'));
    mongoOperation.addimage(mongoCollection, ID, message)
  })

})
router.post('/tellscore', urlencoderParser, function (req, res) {
  let mongoCollection = "user";
  let score = { score: req.body.score };
  let profile = { id: req.body.id };
  mongoOperation.updatescore(mongoCollection, profile, score);
})

router.post('/tellteamscore', urlencoderParser, function (req, res) {
  let mongoCollection = "team";
  let score = { score: req.body.score };
  let profile = { name: req.body.name };
  console.log("====================================");
  console.log(score);
  console.log(profile);
  mongoOperation.updatescore(mongoCollection, profile, score);
})

router.post('/update_score', urlencoderParser, function (req, res) {
  let mongoCollection = "team";
  let team = req.body.name;
  console.log(team);
  let object = mongoOperation.mongoGetScore(mongoCollection, team);
  object.then((val) => {
    console.log("----------------------------------");
    console.log(val);
    res.send(val);
  });
})

router.post("/upload", urlencoderParser, function (req, res) {
  console.log("Server receive request...")
  req.setEncoding('binary');
  var body = '';   // 文件数据
  var fileName = '';  // 文件名
  // 边界字符串
  var boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '');
  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    var file = querystring.parse(body, '\r\n', ':')

    // 只处理图片文件
    if (file['Content-Type'].indexOf("image") !== -1) {
      //获取文件名
      var fileInfo = file['Content-Disposition'].split('; ');
      for (value in fileInfo) {
        if (fileInfo[value].indexOf("filename=") != -1) {
          //fileName = fileInfo[value].substring(10, fileInfo[value].length-1);
          fileName = "./public/target.jpg"
          if (fileName.indexOf('\\') != -1) {
            //fileName = fileName.substring(fileName.lastIndexOf('\\')+1);
            fileName = "./public/target.jpg"
          }
          console.log("File Name : " + fileName);
        }
      }

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
        console.log('Image has been uploaded.');
      });
    } else {
      console.log('只能上传图片文件');
    }
    res.send("200");
    // fs.createReadStream('./target.jpg').pipe(fs.createWriteStream('./public/target.jpg'));
    //runPython(res);

  })
})

function runPython(res) {
  console.log('Python is running')
  var spawn = require("child_process").spawn;
  var process = spawn('python3', ["./compare0.py",]);
  process.stdout.on('data', function (data) {
    console.log(data.toString());
    res.send(data.toString());
  })

}

module.exports = router;
