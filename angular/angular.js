/* global angular*/

angular.module('myApp', ['ngRoute']).config(config); //array left empty for dependencies
console.log("angular.js");
function config($routeProvider){
    console.log($routeProvider);
    $routeProvider.when('/', {
        templateUrl: 'templates/main.html', 
        controller: 'MyController', 
        controllerAs: 'vm'
    }).when('/about', {
        templateUrl: 'templates/about.html', 
        controller: 'AboutController',
        controllerAs: 'vm'
    }).otherwise({
        redirectTo: '/'
    });
}