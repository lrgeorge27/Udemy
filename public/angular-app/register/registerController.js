/*global angular $http*/
angular.module('meanhotel').controller('RegisterController', RegisterController);

function RegisterController($http){
    var vm = this;
    
    vm.register = function(){
        //collect user info
        var user = {
            username: vm.username,
            password: vm.password
        };
        
        //check to make sure username and password exists
        if(!vm.username || !vm.password){
            vm.error = "Please add a username and a password.";
        } else {
            if(vm.password != vm.passwordRepeat){   //check to make sure password and password-repeate are the same
                vm.error = "Please make sure the passwords match.";
            } else {    //if okay, send request
                $http.post('/api/users/register', user).then(function(result){
                    console.log(result);
                    vm.message = "Successful registration, please login.";
                    vm.error = "";
                }).catch(function(error){
                    console.log(error);
                });
            }
        }
        
        
    };
    
}
