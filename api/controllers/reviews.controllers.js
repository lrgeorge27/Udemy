var mongoose = require('mongoose'); 
var Hotel = mongoose.model('Hotel');


//GET all reviews for a hotel
module.exports.reviewsGetAll = function(req, res){
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);
    
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, doc){
            if(!doc) {
                console.log("Hotel not found");
                res
                    .status(404)
                    .json({"message": "Hotel ID not found."});
                return;
            }
            else if(err){
                console.log("Error finding reviews");
                res
                    .status(500)
                    .json(err);
            }
            else if(!doc.reviews){
                console.log("No reviews available");
                res
                    .status(200)
                    .json({"message": "There are no reviews available for this hotel."});
            }
            
            console.log("Returned doc", doc);
            res
                .status(200)
                .json(doc.reviews);  
         });
};

//GET single review for a hotel
module.exports.reviewsGetOne = function(req, res){
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("GET reviewId" + reviewId + " for hotelId" + hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, hotel){
    
            if(!hotel) {
                res
                    .status(404)
                    .json({"message": "Hotel ID not found"});
                return;
            }
            else if(err){
                console.log("Error finding review");
                res
                    .status(500)
                    .json(err);
            }
            else {
                var review = hotel.reviews.id(reviewId);
                
                if(!review){
                console.log("No review available");
                res
                    .status(404)
                    .json({"message": "No review available for ID given"});
                return;
            }
            }
            console.log("Returned hotel", hotel);
            res
                .status(200)
                .json(review);  
         });
};

//needed to add ObjectIds to sub documents to pull single info from db

var _addReview = function(req, res, hotel){
  
  hotel.reviews.push({
      name: req.body.name, 
      rating: parseInt(req.body.rating, 10),
      review: req.body.review
  });
  
  hotel.save(function(err, hotelUpdated){
      if (err){
          res
            .status(500)
            .json(err);
      } else {
          res
            .status(201)
            .json(hotelUpdated.reviews[hotelUpdated.reviews.length -1]);
      }
  });
    
};



module.exports.reviewsAddOne = function(req, res){
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);
    
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, doc){
            var response = {
                status: 200,
                message: []
            }
            if(err){
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            }
            else if(!doc) {
                console.log("Hotel not found", hotelId);
                response.status = 404;
                response.message = {"message": "Hotel ID not found " + hotelId};
            }
            if (doc){
                _addReview(req, res, doc);
            } else {
                console.log("Returned doc", doc);
                res
                    .status(200)
                    .json(doc.reviews);  
            }
         });
};

module.exports.reviewsUpdateOne = function(req, res){
  
};