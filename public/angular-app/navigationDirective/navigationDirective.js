/* global angular*/
angular.module('meanhotel').directive('mhNavigation', mhNavigation);

function mhNavigation(){
    return{
        restrict: 'E',
        templateUrl: 'angular-app/navigationDirective/navigationDirective.html'
    };
}