console.log("1: Start app");

var holdOn = setTimeout(function(){
   console.log("2: In the setTimeout") ;
}, 1000); //asynchronous call, appears 3rd when run. 

console.log("3: End app");