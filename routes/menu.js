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
module.exports = router;
