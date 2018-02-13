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
    var maxCount = 20;
    
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
    var id = req.params.hotelId;
    console.log("GET hotelId", id);
    
    Hotel
        .findById(id)
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

var _splitArray = function(input) {
    var output;
    if(input && input.length > 0){
        output = input.split(";");
    } else {
        output = [];
    }
    return output;
};

module.exports.hotelsAddOne = function(req, res){
    
    Hotel
        .create({
        //key = name of mongoose path, value = value to store in doc
            name: req.body.name, 
            description: req.body.description, 
            stars: parseInt(req.body.stars, 10), 
            services: _splitArray(req.body.services), 
            photos: _splitArray(req.body.photos),
            currency: req.body.currency, 
            location: {
                address: req.body.address,
                coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            }
        }, function(err, hotel){
            if(err){
                console.log("Error creating hotel");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("Hotel created", hotel);
                res
                    .status(201)
                    .json(hotel);
            }
        });

    
};

//drive has insertOne method accepts 2 params, data object to be stored and callback function for when object is complete

module.exports.hotelsUpdateOne = function(req, res){
    //find doc to create model instance, update data, save mi, send res to requester
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);
    
    Hotel
        .findById(hotelId)
        .select("-reviews -rooms") //-key, excludes that key value pair from the response
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
            if (response.status !== 200){
                res
                    .status(response.status)
                    .json(response.message); 
            }
            else{
                //exclude subdocuments
                //update data
               doc.name = req.body.name, 
               doc.description = req.body.description, 
               doc.stars = parseInt(req.body.stars, 10), 
               doc.services = _splitArray(req.body.services), 
               doc.photos = _splitArray(req.body.photos),
               doc.currency = req.body.currency, 
               doc.location = {
                    address: req.body.address,
                    coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            };
            //save model instance to mongoDB
            doc.save(function(err, hotelUpdated){
               if(err){
                   res 
                     .status(500)
                     .json(err);
               } else{
                   res
                     .status(204) //success, no content
                     .json();
               }
            });
            }
         });
};


module.exports.hotelsDeleteOne = function(req, res){
    var hotelId = req.params.hotelId;
    
    Hotel
        .findByIdAndRemove(hotelId)
        .exec(function(err, hotel){
           if(err) {
               res
                .status(404)
                .json(err);
           } else {
               console.log("Hotel deleted, id: ", hotelId);
               res
                .status(204)
                .json();
           }
        });
};

