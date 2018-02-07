//create a controller file for each logical collection of items
// var dbconn = require('../data/dbconnections.js'); //links to node, which connects to mongodb, has the same state as app.js
// var ObjectId = require('mongodb').ObjectId; //driver has a method to query mongodb using data type, objectId helper
// var hotelData = require('../data/hotel-data.json'); //link json data file for hotels
var mongoose = require('mongoose'); //Mongoose is now taking over connections for the native driver
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res){
  //build geo spatial query, need to extract values from string to create Geo Json point
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  
  //A geoJson point
  var point = {
      type: "Point", 
      coordinates: [lng, lat]
  };
//   var geoOptions = {
//       spherical: true, 
//       maxDistance: 2000, //in meters = 2km
//       num: 5
//   };
  
  Hotel
    .aggregate([
        {
            "$geoNear": {
                "near": point,
                "distanceField": "distance",
                "spherical": true, 
                "maxDistance": 2000, //in meters = 2km
                "num": 5
            }
        }
    ], function(err, results, stats){
        if (err) {
            console.log(err);
            res
                    .status(500)
                    .json(err);
        }
        console.log("Geo results: ", results);
        console.log("Geo stats: ", stats);
        res
            .status(200)
            .json(results);
    });
};

module.exports.hotelsGetAll = function(req, res){
   
//   var db = dbconn.get(); //needed for native driver
//   var collection = db.collection('hotels');
   
    var offset = 0;
    var count = 5;
    var maxCount = 10;
    
    if(req.query && req.query.lat && req.query.lng){
        runGeoQuery(req, res);
        return;
    }
   
    if(req.query && req.query.offset){   //if query property exist, and query property has a offset
      offset = parseInt(req.query.offset, 10); //take value and set as offset value, use parseInt to convert string to num
    }
   
    if(req.query && req.query.count){   //if query property exist, and query property has a count
      count = parseInt(req.query.count, 10); //take value and set as count value, use parseInt to convert string to num
    }
    
    if (isNaN(offset) || isNaN(count)){ //validate count and offset params are numbers
        res
            .status(400)
            .json({"message": "If supplied in querystring count and offset should be numbers"});
        return;
    }
    
    if(count > maxCount){
        res
            .status(400)
            .json({"message": "Count limit of " + maxCount + " exceeded"});
        return;
    }

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        //execute query
        .exec(function(err, hotels){
            if(err){
                console.log("Error finding hotels");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found hotels", hotels.length);
                res
                .json(hotels);
            }
        });
};    
module.exports.hotelsGetOne = function(req, res){
    //extract a parameter and put it into a var
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);
    
    Hotel
        .findById(hotelId)
        .exec(function(err, doc){
            var response = {
                status: 200,
                message: doc
            };
            if(!doc) {
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found"
            };
            }
            else if(err){
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } 
            res
                .status(response.status)
                .json(response.message); 
         });
};

module.exports.hotelsAddOne = function(req, res){
    
    var db = dbconn.get();
    var collection = db.collection('hotels');
    var newHotel;

    console.log("POST new hotel");
    
    if(req.body && req.body.name && req.body.stars){
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
        collection.insertOne(newHotel, function(err, response){
         console.log(response); 
         console.log(response.ops);  
           res
            .status(201)
            .json(response.ops);
        });
    } else {
        console.log("Data missing from body");
        res
            .status(400)
            .json({message:"Required data missing from body"});
    }
};

//drive has insertOne method accepts 2 params, data object to be stored and callback function for when object is complete