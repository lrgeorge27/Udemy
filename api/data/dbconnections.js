var MongoClient = require('mongodb').MongoClient; //native driver class 
var dburl = 'mongodb://lrgeorge27-firstworkspace-5563394/meanhotel';
//connection string 'protocal://server:port/dbname'

var _connection = null; //hold the connection

//method to open the connection
var open = function() {
    //set connection
    MongoClient.connect(dburl, function(err, db){
        if (err) {
            console.log("DB connection failed");
            return;
        }
        _connection = db;
        console.log("DB connection open", db);
    });
};

//get connection once created
var get = function() {
    return _connection;
};

module.exports = {
    open: open,
    get: get
};

