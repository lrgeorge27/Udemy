// require('./api/data/dbconnections.js').open(); //starts the connection process and saved in a var inside dbconnection.js
require('./api/data/db.js'); //starts connection with mongoose, use either dbconnections.js or mongoose, not both
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser'); //middleware, between static path and routes
//order is impt with middleware, doesn't need to be run on static path, but needed for routes, so it must come before routes
var routes = require('./api/routes');

app.set('port', process.env.PORT); //sets port property for entire app

//middleware - allows interaction with request before response is given
//order is impt - run sequentially in order place in code
app.use(function(req, res, next){    //can begin function with a path to log only calls to that path
   console.log(req.method, req.url);
   next();
});

//set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
// app.use('/fonts', express.static(__dirname + '/fonts'));

//enable parsing of posted forms
app.use(bodyParser.urlencoded({extended: false})); //method urlencoded is how html forms are sent, specify extended option to prevent warning in console. False = only need strings and arrays from form body, true = access to other data types
app.use(bodyParser.json()); //look for json data

//add routing
app.use('/api', routes); //With just / app.use looks in routes folder for all routes

// app.get('/', function(req, res){
//    console.log("GET the homepage");
//    res
//    .status(200)
//    .sendFile(path.join(__dirname, 'public', 'index.html')); //.join() puts files together in correct syntax, so a string of file name is all that is needed
// });

// app.get('/json', function(req, res){
//    console.log("GET the json");
//    res
//    .status(200)
//    .json({"jsonData": true});
// });

// //return static file .sendFile(path)
// app.get('/file', function(req, res){
//    console.log("GET the json");
//    res
//    .status(200)
//    .sendFile(path.join(__dirname, 'app.js')); //2 underscores before dirname
// });


var server = app.listen(app.get('port'), function(){  //define server
    var port = server.address().port;   //get port address
    console.log("Magic happens on port " + port); //asynchronous call
});
