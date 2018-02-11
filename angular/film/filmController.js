/* global angular */

angular.module('myApp').controller('FilmController', FilmController);

function FilmController($http, $routeParams){
    var vm = this;
    var id = $routeParams.id;
    $http.get('https://swapi.co/api/films/').then(function(response){
        vm.film = response.data.results[id];
    });
    vm.about = 'This is my bio';
}