/* global angular*/

angular.module('myApp', ['ngRoute']).config(config); //array left empty for dependencies
console.log("angular.js");
//$routeProvider - built in angular service
function config($routeProvider){
    // console.log($routeProvider);
    $routeProvider.when('/', {
        templateUrl: 'main/main.html', 
        controller: 'MainController', 
        controllerAs: 'vm'
    }).when('/film/:id', {
        templateUrl: 'film/film.html', 
        controller: 'FilmController',
        controllerAs: 'vm'
    }).otherwise({
        redirectTo: '/'
    });
}