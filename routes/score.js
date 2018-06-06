let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

let mongoOperation = require("../../cluescity/mongo-express/main.js");

router.get('/',function(req,res){
  res.sendFile('Score.html', {
    root : 'public'
  });
});

router.post('/getscore', urlencodedParser,function(req,res){
    
    databaseCollection = "user";
    mongoOperation.mongoSort(databaseCollection); 

});

module.exports = router;
