/* global angular */

angular.module('myApp').controller('MainController', MainController);

// $http - built in service, uses GET, POST, PUT methods
function MainController(FilmFactory){
    var vm = this;
    
    FilmFactory.getAllFilms().then(function(response){
        vm.films = response
        console.log(vm.films);
    })
    // $http.get('https://swapi.co/api/films/').then(function(response){
    //     console.log(response);
    //     vm.films = response.data.results;
    // });
    vm.name = 'Lauren';
}
