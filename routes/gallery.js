
let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

let mongoOperation = require("../../cluescity/mongo-express/main.js");
var sender_info = "sender_info"; 
var be_sender_id = "111"; 
var team;

router.use(bodyParser.json());

router.get('/',function(req,res){
  res.sendFile('gallery.html', {
    root : 'public'
  });
});

router.post('/team', urlencodedParser,function(req,res){
    let mongoCollection = "team";
    team = req.body; 
    mongoOperation.mongoFind( mongoCollection , req.body);
});


module.exports = router;
