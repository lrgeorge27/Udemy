var express = require('express');
var router = express.Router();  //Instantiate express router

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll) //map controller to route in hotels.controllers
    .post(ctrlHotels.hotelsAddOne); 

//Extend to filter by long/lat to find other hotels near by
router
    .route('/hotels/:hotelId') //adding a parameter, controller can access
    .get(ctrlHotels.hotelsGetOne) //map controller to route in hotels.controllers
    .put(ctrlHotels.hotelsUpdateOne); //method to update a single hotel doc, put updates entire doc, patch does partial updates

//Review routes
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll) //map controller to route in hotels.controllers
    .post(ctrlReviews.reviewsAddOne);

router
    .route('/hotels/:hotelId/reviews/:reviewId') //adding a parameter, controller can access
    .get(ctrlReviews.reviewsGetOne) //map controller to route in hotels.controllers
    .put(ctrlReviews.reviewsUpdateOne); //method to update single review doc with a single hotel doc

module.exports = router;    //export