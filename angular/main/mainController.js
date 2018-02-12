/* global angular */

angular.module('myApp').controller('MainController', MainController);

// $http - built in service, uses GET, POST, PUT methods
function MainController(FilmFactory){
    var vm = this;

    FilmFactory.getAllFilms().then(function(response){
        vm.films = response;
        console.log(vm.films);
    });
    // $http.get('https://swapi.co/api/films/').then(function(response){
    //     console.log(response);
    //     vm.films = response.data.results;
    // });
    vm.name = 'Lauren';
    
    vm.date1 = '12 February 2018';
    vm.date2 = '11 March 2018';
    vm.date3 = '3 January 2015';
    vm.date4 = '25 April 2014';

    
    console.log(vm.date1);
}
