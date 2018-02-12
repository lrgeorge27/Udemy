/* global angular */
angular.module('myApp').factory('FilmFactory', FilmFactory);

function FilmFactory($http){
    return{
        getAllFilms: getAllFilms, 
        // getOneFilm: getOneFilm
    };
    
    function getAllFilms(){
        return $http.get('https://swapi.co/api/films/').then(complete).catch(failed);
    }
    
    // function getOneFilm(id){
    //     return $http.get('https://swapi.co/api/films/').then(complete).catch(failed);
    // }
    // getOneFilm function is not necessary for my app because the api used does not take ids as a parameter, the api used in Udemy would not connect
    // single films are displayed by putting the id from the response object into the vm, vm.film = response.data.results[id]
    
    function complete(response){
        return response.data.results;
    }
    
    function failed(error){
        return error.statusText;
    }
}