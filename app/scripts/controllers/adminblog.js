'use strict';

/**
 * @ngdoc function
 * @name lotartApp.controller:AdminblogCtrl
 * @description
 * # AdminblogCtrl
 * Controller of the lotartApp
 */
angular.module('lotartApp')
    .controller('AdminblogCtrl', function ($scope, $location, authenticateService, fetchData) {

    var token = 'not working';
    if (localStorage.token){
        try {
            token = JSON.parse(localStorage.token);
            token = token.replace(/"/g, '');

        } catch (e){
            console.log('error');
        }
    } 

    authenticateService.checkToken(token); 

    $scope.posts = {};

    fetchData.allPosts()
        .then(function(response){
        $scope.posts = response.data;
    }, function(error){
        console.log('Error was received: ' + error);
    });

    $scope.editArticle = function(id){
        $location.path('/edit/' + id);  
    };
    /* TO DO : get element by ID is bad */

    $scope.deleteArticle = function(id){
        fetchData.deletePost(id)
            .then(function(){
            var article = document.getElementById('post-' + id);
            article.style.display = 'none';
            console.log('finished');
        }, function(error){
            console.log('Error was received: ' + error);
        });
    };

    $scope.logout = function(){
        var data = {
            token: token
        };  

        fetchData.logOut(data)
            .then(function(response){
            console.log(response.data);
            localStorage.clear();
            $location.path('/');
        }, function(error){
            console.log('Error was received: ' + error);
        });
    };

});