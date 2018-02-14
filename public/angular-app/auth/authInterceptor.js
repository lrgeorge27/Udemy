/* global angular */
angular.module('meanhotel').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($q, $window, AuthFactory){
    return{
            request: request,
            response: response,
            responseError: responseError
    };
        
    function request(config){
        config.headers = config.headers || {};
        if($window.sessionStorage.token){
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
    }
    
    function response(response){
        
    }
    
    function responseError(rejection){
        
    }
}