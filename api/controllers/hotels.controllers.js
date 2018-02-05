//create a controller file for each logical collection of items
// var dbconn = require('../data/dbconnections.js'); //links to node, which connects to mongodb, has the same state as app.js
// var ObjectId = require('mongodb').ObjectId; //driver has a method to query mongodb using data type, objectId helper
// var hotelData = require('../data/hotel-data.json'); //link json data file for hotels
var mongoose = require('mongoose'); //Mongoose is now taking over connections for the native driver
var Hotel = mongoose.model('Hotel');

module.exports.hotelsGetAll = function(req, res){
   
//   var db = dbconn.get(); //needed for native driver
//   var collection = db.collection('hotels');
   
    var offset = 0;
    var count = 5;
   
    if(req.query && req.query.offset){   //if query property exist, and query property has a offset
      offset = parseInt(req.query.offset, 10); //take value and set as offset value, use parseInt to convert string to num
    }
   
    if(req.query && req.query.count){   //if query property exist, and query property has a count
      count = parseInt(req.query.count, 10); //take value and set as count value, use parseInt to convert string to num
    }

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        //execute query
        .exec(function(err, hotels){
            console.log("Found hotels", hotels.length);
            res
                .json(hotels);
        });
        
//   collection
//     .find()
//     .skip(offset)
//     .limit(count)
//     .toArray(function(err, docs){
//         console.log("Found hotels", docs);
//           res
//             .status(200)
//             .json(docs);
//     });
   
};      
//   console.log("db", db);
 //opening database connection is asynchronous, no gaurantee it will be ready before controller file is brought into app.
 //a GET call on each method makes sure db connection can be made when we need it
 //best practice to open the connection once when app starts and reuse that connection whenever needed
//   console.log("GET the hotels");
//   console.log(req.query);
   

module.exports.hotelsGetOne = function(req, res){
    
    // var db = dbconn.get();
    // var collection = db.collection('hotels');

    //extract a parameter and put it into a var
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);
    
    Hotel
        .findById(hotelId)
        .exec(function(err, doc){
            res
                .status(200)
                .json(doc);  
         });
};

module.exports.hotelsAddOne = function(req, res){
    
    var db = dbconn.get();
    var collection = db.collection('hotels');
    var newHotel;
    // console.log("db", db);
   
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