//Do not need both dbconnections.js and db.js with mongoose, in a reg app use one or the other.
var mongoose = require('mongoose');
var dburl = 'mongodb://lrgeorge27-firstworkspace-5563394/meanhotel';
//var retry = null;
mongoose.connect(dburl);

//Listeners
mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ' + dburl);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error: ' + err);
});

//process events that signify app is being started or stopped (Impt for Unix systems)
process.on('SIGINT', function(){    //killed process, ctrl C in command line
   mongoose.connection.close(function(){
       console.log('Mongoose disconnected through app termination (SIGINT)');
       process.exit(0);
   }); 
}); 

process.on('SIGTERM', function(){    //killed process, ctrl C in command line
   mongoose.connection.close(function(){
       console.log('Mongoose disconnected through app termination (SIGTERM)');
       process.exit(0);
   }); 
}); 

process.once('SIGUSR2', function(){    //killed process, ctrl C in command line
   mongoose.connection.close(function(){
       console.log('Mongoose disconnected through app termination (SIGUSR2)');
       process.kill(process.pid, 'SIGUSR2');
   }); 
}); 

//Bring in schemas and models
require('./hotels.model');
//deleted .js from end of ./hotels.model to match gitHub
require('./users.model');