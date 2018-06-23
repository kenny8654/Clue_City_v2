
let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

let mongoOperation = require("../../cluescity/mongo-express/main.js");
var sender_info = ""; 
var be_sender_id = ""; 
var team;

router.use(bodyParser.json());

router.get('/',function(req,res){
  res.sendFile('friend.html', {
    root : 'public'
  });
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
