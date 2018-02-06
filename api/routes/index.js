var express = require('express');
var router = express.Router();  //Instantiate express router

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll); //map controller to route in hotels.controllers

router
    .route('/hotels/:hotelId') //adding a parameter, controller can access
    .get(ctrlHotels.hotelsGetOne); //map controller to route in hotels.controllers

router
    .route('/hotels/new')
    .post(ctrlHotels.hotelsAddOne); 
    
    // .post(function(req, res){
    //     console.log("POST the json route");
    //     res
    //         .status(200)
    //         .json({"jsonData": "POST received"});
    // });
    
//Review routes
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll); //map controller to route in hotels.controllers

router
    .route('/hotels/:hotelId/reviews/:reviewId') //adding a parameter, controller can access
    .get(ctrlReviews.reviewsGetOne); //map controller to route in hotels.controllers

module.exports = router;    //export