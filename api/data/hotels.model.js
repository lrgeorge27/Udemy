//Schema file to keep schema separate from mongoose connections
var mongoose = require('mongoose');
//Nested document
var reviewSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true
    },
    rating:{
        type: Number, 
        min: 0,
        max: 5,
        required: true
    },
    review:{
        type: String,
        required: true
    },
    createdOn:{
        type: Date,
        default: Date.now
    }
});
//Nested document
var roomSchema = new mongoose.Schema({
   type: String,
   number: Number, 
   description: String,
   photos: [String],
   price: Number
});
//Parent document, nested schemas must come before parent schemas
var hotelSchema = new mongoose.Schema({ 
    //schema definition //path: schema type
    name: {
        type: String,
        required: true
    },    
    stars: {
        type: Number, //no double or long numbers
        min: 0, 
        max: 5, 
        default: 0
    }, 
    services: [String],
    description: String,
    photos: [String],
    currency: String, 
    reviews: [reviewSchema], //schema type becomes review schema definition, in an array because the reviews object in mongodb is an array of objects
    rooms: [roomSchema], 
    location: {
        address: String, 
        //Always store coordinates in order: longitude(E/W), latitude(N/S) 
        coordinates:{
            type: [Number],
            index: '2dsphere'
        } 
    }
});

//Model is compiled version of a schema, single instance of a schema has 1:1 relationship with document in db
mongoose.model('Hotel', hotelSchema, 'hotels');
            //('Name', name of schema, 'mongodb collection') 
//collection name is optional, mongoose will look for a lowercase pluarlized version of the model name as the collection name.
//In this case Hotel = hotels, do not need the collection name.

//nested schemas


