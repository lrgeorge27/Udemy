var fs = require('fs');

var onFileLoad = function(err, file){
    console.log("Got the file!");
};

console.log("Going to get a file!");

fs.readFile("readFileSync.js", onFileLoad); //uses a named function callback to clean up code

// fs.readFile('readFileSync.js', function(err, file){
//     console.log("Got the file!"); //moved from var to anonymous callback
// });

console.log("App continues...");