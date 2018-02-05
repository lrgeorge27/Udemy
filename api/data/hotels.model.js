//Schema file to keep schema separate from mongoose connections
var mongoose = require('mongoose');

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
    currency: String
});

//Model is compiled version of a schema, single instance of a schema has 1:1 relationship with document in db
mongoose.model('Hotel', hotelSchema, 'hotels');
            //('Name', name of schema, 'mongodb collection') 
//collection name is optional, mongoose will look for a lowercase pluarlized version of the model name as the collection name.
//In this case Hotel = hotels, do not need the collection name.


