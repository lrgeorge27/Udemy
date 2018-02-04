//create a controller file for each logical collection of items
var dbconn = require('../data/dbconnections.js'); //links to node, which connects to mongodb, has the same state as app.js
var hotelData = require('../data/hotel-data.json'); //link json data file for hotels

module.exports.hotelsGetAll = function(req, res){
   
   var db = dbconn.get();
   console.log("db", db);
 //opening database connection is asynchronous, no gaurantee it will be ready before controller file is brought into app.
 //a GET call on each method makes sure db connection can be made when we need it
 //best practice to open the connection once when app starts and reuse that connection whenever needed
   console.log("GET the hotels");
   console.log(req.query);
   
   var offset = 0;
   var count = 5;
   
   if(req.query && req.query.offset){   //if query property exist, and query property has a offset
       offset = parseInt(req.query.offset, 10); //take value and set as offset value, use parseInt to convert string to num
   }
   
   if(req.query && req.query.count){   //if query property exist, and query property has a count
       count = parseInt(req.query.count, 10); //take value and set as count value, use parseInt to convert string to num
   }

   var returnData = hotelData.slice(offset, offset+count); //take hotelData array, slice it using offset as starting point and adding count to offset to get the end point of slice
   
    res
        .status(200)
        .json(returnData);  
};

module.exports.hotelsGetOne = function(req, res){
    
    var db = dbconn.get();
    console.log("db", db);
    
    //extract a parameter and put it into a var
    var hotelId = req.params.hotelId;
    var thisHotel = hotelData[hotelId]; //holds into about specific hotel using url parameter as location index on hotelData array (json object[0-i])
    console.log("GET hotelId", hotelId);
    res
        .status(200)
        .json(thisHotel);  
};

module.exports.hotelsAddOne = function(req, res){
    
    var db = dbconn.get();
    console.log("db", db);
   
    console.log("POST new hotel");
    console.log(req.body);  //body parser middleware will put data parsed out of posted form
    res
        .status(200)
        .json(req.body);
};