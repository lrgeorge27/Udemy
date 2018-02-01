var express = require('express');
var app = express();
var path = require('path');

app.set('port', process.env.PORT); //sets port property for entire app

//middleware - allows interaction with request before response is given
//order is impt - run sequentially in order place in code
app.use(function(req, res, next){    //can begin function with a path to log only calls to that path
   console.log(req.method, req.url);
   next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
   console.log("GET the homepage");
   res
   .status(200)
   .sendFile(path.join(__dirname, 'public', 'index.html')); //.join() puts files together in correct syntax, so a string of file name is all that is needed
});

app.get('/json', function(req, res){
   console.log("GET the json");
   res
   .status(200)
   .json({"jsonData": true});
});

//return static file .sendFile(path)
app.get('/file', function(req, res){
   console.log("GET the json");
   res
   .status(200)
   .sendFile(path.join(__dirname, 'app.js')); //2 underscores before dirname
});


var server = app.listen(app.get('port'), function(){  //define server
    var port = server.address().port;   //get port address
    console.log("Magic happens on port " + port); //asynchronous call
});
