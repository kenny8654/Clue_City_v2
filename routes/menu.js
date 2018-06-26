let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

let mongoOperation = require("../../cluescity/mongo-express/main.js");
let team ;
router.get('/',function(req,res){
  res.sendFile('menu.html', {
    root : 'public'
  });
});

router.post('/team', urlencodedParser,function(req,res){
    let mongoCollection = "team";
    team = req.body; 
    mongoOperation.mongoFind( mongoCollection , team);
});

router.post('/check', urlencodedParser,function(req,res){
    databaseCollection = "user";
    mongoOperation.checkinvite(
        databaseCollection ,
        req.body.sender , 
        req.body
    ); 
});
router.post('/teamstart', urlencodedParser,function(req,res){

    let mongoCollection = "team";
    let teamname = req.body.name ;
   console.log("enter menu.js"); 
    let promise = mongoOperation.mongoFindstart( mongoCollection , teamname);
    promise.then((val)=>{
      console.log(val);
      res.send(val);
    })
});
router.post('/signal', urlencodedParser, function(req,res){
    var mongoCollection = "user";
    let myId = req.body.id ;
    let object = mongoOperation.mongoFindinvite(mongoCollection, myId);
    object.then((val)=>{
      if(val == null){
        res.send(val);
      }
      else{
        res.send(val);
      }
    });
});
module.exports = router;
