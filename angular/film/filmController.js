/* global angular */

angular.module('myApp').controller('FilmController', FilmController);

function FilmController($routeParams, FilmFactory){
    var vm = this;
    var id = $routeParams.id;
    FilmFactory.getAllFilms().then(function(response){
        vm.film = response[id];
        console.log(vm.film);
    });
    // $http.get('https://swapi.co/api/films/').then(function(response){
    //     vm.film = response.data.results[id];
    // });
    vm.about = 'This is my bio';
}