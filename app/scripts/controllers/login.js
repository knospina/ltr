'use strict';

/**
 * @ngdoc function
 * @name lotartApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the lotartApp
 */
angular.module('lotartApp')
    .controller('LoginCtrl', function ($scope, $location, fetchData) {

    /*$scope.signUpInfo = {
        username: undefined,
        email   : undefined,
        password: undefined
    }*/

    $scope.loginInfo = {
        username: undefined,
        password: undefined
    };

    /*$scope.signUserUp = function(){
        var data = {
            username: $scope.signUpInfo.username,
            email   : $scope.signUpInfo.email,
            password: $scope.signUpInfo.password
        }

        $http.post('/slim/db-operation.php/signup', data).success(function(response){
            console.log(response);
            localStorage.setItem('token', JSON.stringify(response));
            $state.go('post');
        }).error(function(error){
            console.log('Nop, did not work "Creating new user"', error);
        });
    }*/

    $scope.loginUser = function(){
        var data = {
            username: $scope.loginInfo.username,
            password: $scope.loginInfo.password
        };

        fetchData.logIn(data)
            .then(function(response){
            console.log(response);
            localStorage.setItem('token', JSON.stringify(response.data));
            $location.path('/adminBlog');
        }, function(error){
            $scope.posts = 'Error was received: ' + error;
        });

    };


});