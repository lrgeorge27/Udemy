//create a controller file for each logical collection of items
var hotelData = require('../data/hotel.data.json'); //link json data file for hotels

module.exports.hotelsGetAll = function(req, res){
   console.log("GET the hotels");
    res
        .status(200)
        .json(hotelData);  
};

module.exports.hotelsGetOne = function(req, res){
    //extract a parameter and put it into a var
    var hotelId = req.params.hotelId;
    var thisHotel = hotelData[hotelId]; //holds into about specific hotel using url parameter as location index on hotelData array (json object[0-i])
   console.log("GET hotelId", hotelId);
    res
        .status(200)
        .json(thisHotel);  
};