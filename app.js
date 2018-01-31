var express = require('express');
var app = express();

app.set('port', process.env.PORT); //sets port property for entire app

app.get('/', function(req, res){
   console.log("GET the homepage");
   res
   .status(404)
   .send("Express yourself!");
});

app.get('/json', function(req, res){
   console.log("GET the json");
   res
   .status(200)
   .json({"jsonData": true});
});

var server = app.listen(app.get('port'), function(){  //define server
    var port = server.address().port;   //get port address
    console.log("Magic happens on port " + port); //asynchronous call
});
