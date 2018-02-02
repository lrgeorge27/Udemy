var express = require('express');
var router = express.Router();  //Instantiate express router
var ctrlHotels = require('../controllers/hotels.controllers.js');
router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll); //map controller to route in hotels.controllers

router
    .route('/hotels/:hotelId') //adding a parameter, controller can access
    .get(ctrlHotels.hotelsGetOne); //map controller to route in hotels.controllers

    
    // .post(function(req, res){
    //     console.log("POST the json route");
    //     res
    //         .status(200)
    //         .json({"jsonData": "POST received"});
    // });

module.exports = router;    //export