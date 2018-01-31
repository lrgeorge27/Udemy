require('./instantHello'); //best practice not to use .js extention
var goodbye = require('./talk/goodbye'); //reference module.export function
var talk = require('./talk'); //look for a file in same folder called talk, then will look for a folder called talk, then will look for an index file within folder, why we exclude extensions
var question = require('./talk/question');
//use the ./ to look for folders in the same directory
//use ./dirname to go to subfolders



talk.intro();
talk.hello(" Lauren");

var answer = question.ask("What is the meaning of life?");
console.log(answer); //method in question.js only console.logs the question, and returns the answer, so we need to set up a variable to console.log the answer.

goodbye(); //call module.export function


//left off at Section 1, level 4 on Jan 30, 2018
//Next up Section 1, level 5