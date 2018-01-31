var child_process = require('child_process'); //runs a separate process

console.log(1);

var newProcess = child_process.spawn('node', ['./fibonacci.js'], {
    stdio: 'inherit' //ensures console.log of child process will show in the main command line
});
    
console.log(2);