//angular-app folder
/* global angular HotelsController HotelController */

angular.module('meanHotel', ['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/hotel-list/hotels.html',
            controller: HotelsController,
            controllerAs: 'vm'
        })
        .when('/hotels/:id', {
            templateUrl: 'angular-app/hotel-display/hotel.html', 
            controller: HotelController, 
            controllerAs: 'vm'
        });
}

