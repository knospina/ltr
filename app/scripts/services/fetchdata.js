'use strict';

/**
 * @ngdoc service
 * @name lotartApp.fetchData
 * @description
 * # fetchData
 * Service in the lotartApp.
 */
angular.module('lotartApp')
    .service('fetchData', function ($http) {

    var urlBase = 'http://playground.lotart.lv/slim/db-operation.php/';

    this.allPosts = function(){
        return $http.get(urlBase);
    };

    this.onePost = function(id){
        return $http.get(urlBase + 'article/' + id);
    };

    this.logIn = function(data){
        return $http.post(urlBase + 'login', data);
    };

    this.checkToken = function(data){
        return $http.post(urlBase + 'check-token', data);  
    };

    this.logOut = function(data){
        return $http.post(urlBase + 'logout', data);
    };

    this.deletePost = function(id){
        return $http.delete(urlBase + 'delete_article/' + id);
    };

    this.addPost = function(data){
        return $http.post(urlBase + 'article_add', data);
    };

    this.addImage = function(data){
        return $http.post(urlBase + 'image_add', data, {headers: {'Content-Type': undefined}});
    };
});