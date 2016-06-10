'use strict';

/**
 * @ngdoc function
 * @name lotartApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the lotartApp
 */
angular.module('lotartApp')
    .controller('BlogCtrl', function ($scope, $http, $location, fetchData) {

    $scope.posts = {};
    $scope.category = $location.path().substr(1);

    fetchData.allPosts()
        .then(function(response){
        $scope.posts = response.data;
        console.log($scope.posts);
    }, function(error){
        $scope.posts = 'Error was received: ' + error;
    });

    /* Opens single post */
    $scope.openArticle = function(articleId){
        $location.path('article/' + articleId);  
    };

});