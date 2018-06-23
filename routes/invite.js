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
    let teammate ={ id : req.body.id} ;
    let teamname = req.body.name ;
    mongoOperation.addteammate( mongoCollection , teamname , teammate);
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
    mongoOperation.addclicked( mongoCollection , teamname , entry);
})


router.post('/friend', urlencodedParser,function(req,res){

    let mongoCollection = "user";
    let me = req.body;
    let promise = mongoOperation.GetFriend(mongoCollection,me);
    promise.then((val)=>{
      res.send(val);
    })
});
router.post('/find_friend', urlencodedParser,function(req,res){
    let mongoCollection = "user";
    let friend_name = { name : req.body.name };
    let friend_id = { id : req.body.id };
    console.log(friend_name);
    let object1 = mongoOperation.Findone( mongoCollection ,friend_name);
    object1.then((val1)=>{
      if(val1 == null){
        console.log(friend_name);
        let object2 = mongoOperation.Findone( mongoCollection , friend_id );
        object2.then((val2)=>{
          if(val2 == null){
            console.log("can't find this person");
          }
          else{
            res.send(val2);
          }
        });
      }
      else{
            res.send(val1);
      }
    });
});

router.post('/addfriend', urlencodedParser,function(req,res){
    let mongoCollection = "user";
    let myid = { id : req.body.myid };
    let friend = { id : req.body.id ,
                  name: req.body.name,
                 };
    console.log(myid);
    mongoOperation.addfriend( mongoCollection ,myid,friend);
});

module.exports = router;
