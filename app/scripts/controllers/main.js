'use strict';

/**
 * @ngdoc function
 * @name lotartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lotartApp
 */
angular.module('lotartApp')
    .controller('MainCtrl', function ($scope, $location, fetchData) {

    var data = {
        limit: 3,
        offset: 0,
        category: 'blog'
    };

    $scope.posts = {};

    fetchData.allPosts(data)
        .then(function(response){
        $scope.posts = response.data;
    }, function(error){
        $scope.posts = 'Error was received: ' + error;
    });

    $scope.openArticle = function(articleId){
        $location.path('article/' + articleId);  
    };


});
