'use strict';

/**
 * @ngdoc function
 * @name lotartApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the lotartApp
 */
angular.module('lotartApp')
    .controller('BlogCtrl', function ($scope, $http, $location, $routeParams, fetchData) {

    var queryParam = {};

    if ($routeParams.year) {
        var start = 0, end = 0;
        if ($routeParams.month){
            start = new Date($routeParams.year, parseInt($routeParams.month)-1);
            end = new Date($routeParams.year, $routeParams.month);
        } else {
            start = new Date($routeParams.year);
            end = new Date((parseInt($routeParams.year)+1).toString());
        }
        start = Math.round((start.getTime() / 1000));
        end = Math.round((end.getTime() / 1000));
        queryParam = {
            'start' : start,
            'end' : end
        };
    }   

    $scope.posts = {};
    if ($location.path().split('/')[1] === 'paris'){
        $scope.category = 'blog';
    } else {
        $scope.category = $location.path().split('/')[1];
    }
    

    fetchData.allPosts(queryParam)
        .then(function(response){
        $scope.posts = response.data;
        $scope.changePosts($scope.posts);
    }, function(error){
        $scope.posts = 'Error was received: ' + error;
    });

    $scope.changePosts = function(posts){         
        var postCount = posts.length;
        for (var i = 0; i < postCount; i++){            
            posts[i].PARAGRAPHS = (posts[i].CONTENT.match(/<p>/g)||[]).length;
        }

        return posts;
    };

    /* Opens single post */
    $scope.openArticle = function(articleId){
        $location.path('article/' + articleId);  
    };

});