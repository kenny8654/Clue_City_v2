let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

let mongoOperation = require("../../cluescity/mongo-express/main.js");
var myscore = "" ;

router.get('/',function(req,res){
  res.sendFile('Score.html', {
    root : 'public'
  });
});

router.post('/getscore', urlencodedParser,function(req,res){
    databaseCollection = req.body.col;
    let object = mongoOperation.mongoSort(databaseCollection);
    object.then((val)=>{
      res.send(val);
    });
});
/*
router.post('/myscore', urlencodedParser,function(req,res){
    let myProfile = req.body;
    databaseCollection = "user";
    let object = mongoOperation.Findone(databaseCollection,myProfile);
    object.then((val)=>{
      res.send(val);
    });
});
router.post('/teamscore', urlencodedParser,function(req,res){
    let myProfile = req.body;
    databaseCollection = "team";
    let object = mongoOperation.Findone(databaseCollection,myProfile);
    object.then((val)=>{
      res.send(val);
    });
});
*/
router.post('/getMyscore', urlencodedParser,function(req,res){
  myscore = req.body.score; 
});

router.post('/Myscore', urlencodedParser,function(req,res){
  res.send(myscore);

  myscore = "" ;
});
module.exports = router;
