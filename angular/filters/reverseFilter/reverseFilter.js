/* global angular */

angular.module('myApp').filter('reverse', reverse);

function reverse(){
    return function(string){
        console.log(string);
        if(string){
            return string.split('').reverse().join('');
        }
    };
}