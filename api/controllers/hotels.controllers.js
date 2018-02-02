//create a controller file for each logical collection of items
var hotelData = require('../data/hotel.data.json'); //link json data file for hotels

module.exports.hotelsGetAll = function(req, res){
   console.log("GET the hotels");
    res
        .status(200)
        .json(hotelData);  
};