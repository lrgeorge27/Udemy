//angular-app folder
/* global angular HotelsController HotelController */

angular.module('meanhotel', ['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/hotel-list/hotels.html',
            controller: HotelsController,
            controllerAs: 'vm'
        })
        .when('/hotel/:id', { //removed s from /hotels/ to match changes in hotels.html
            templateUrl: 'angular-app/hotel-display/hotel.html', 
            controller: HotelController, 
            controllerAs: 'vm'
        });
}

