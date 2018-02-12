//angular-app folder
/* global angular HotelsController */

angular.module('meanHotel', ['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/hotel-list/hotels.html',
            controller: HotelsController,
            controllerAs: 'vm'
        });
}

