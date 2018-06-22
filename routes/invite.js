let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

let Promise = require("es6-promise").Promise;
let mongoOperation = require("../../cluescity/mongo-express/main.js");
var sender_info = "sender_info";
var be_sender_id = "be_sender_id" ; 
var team;

router.use(bodyParser.json());

router.get('/',function(req,res){
  res.sendFile('invite.html', {
    root : 'public'
  });
});

router.post('/team', urlencodedParser,function(req,res){
    team = req.body.name; 
});

router.post('/get_teamname', urlencodedParser,function(req,res){
    res.send(team);
    team = null ;
});
router.post('/teammate', urlencodedParser,function(req,res){
    let mongoCollection = "team";
    let teammate = req.body ;
    mongoOperation.addteammate( mongoCollection , team , teammate);
    res.send(team);
});

router.post('/signal', urlencodedParser, function(req,res){
    var mongoCollection = "user";
    let myId = req.body.id ;
    let object = mongoOperation.mongoFindinvite(mongoCollection, myId);
    let hi ;
    object.then((val)=>{
      if(val == null){
        res.send(val);
      }
      else{
        hi = val ;
        console.log(hi);
        res.send(hi);
      }
    });
});

router.post('/checkresponse', urlencodedParser,function(req,res){
    var mongoCollection = "user";
    let sender = req.body.sender ;
    let object = mongoOperation.mongoFind_checkresponse(mongoCollection,sender);
    object.then((val)=>{
      res.send(val);
    });
});

router.post('/invite', urlencodedParser,function(req,res){ //ok
    let receiver = req.body.to;
    let mongoCollection = "user";
    mongoOperation.invitation( mongoCollection , receiver ,req.body);
});

router.post('/tellteam',urlencodedParser,function(req,res){     
    let mongoCollection = "team";
    let entry = {clicked : '1'};
    let teamname = req.body.name ;
    mongoOperation.addteammate( mongoCollection , teamname , entry);
})

router.post('/teamstart', urlencodedParser,function(req,res){

    let mongoCollection = "team";
    let teamname = req.body.name ;
    let promise = mongoOperation.mongoFindstart( mongoCollection , teamname);
    promise.then((val)=>{
      res.send(val);
    })
});

router.post('/friend', urlencodedParser,function(req,res){

    let mongoCollection = "user";
    let promise = mongoOperation.GetFriend(mongoCollection);
    promise.then((val)=>{
      res.send(val);
    })
});

module.exports = router;
