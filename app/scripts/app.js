'use strict';

/**
 * @ngdoc overview
 * @name lotartApp
 * @description
 * # lotartApp
 *
 * Main module of the application.
 */
angular
    .module('lotartApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'textAngular',
    '720kb.socialshare', 
    'ui.router',
    'angularUtils.directives.dirDisqus'
])
    .config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
        .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
    })
        .when('/paris', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl'
    })
        /*.when('/blog', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl'
    })*/
        .when('/paris/:year', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl'
    })
        .when('/paris/:year/:month', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl'
    })
        .when('/french', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl'
    })
        .when('/tech', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl'
    })
        .when('/post', {
        templateUrl: 'views/post.html',
        controller: 'PostCtrl'
    })
        .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })
        .when('/article/:id', {
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl'
    })
        .when('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl'
    })
        .when('/adminBlog', {
        templateUrl: 'views/adminblog.html',
        controller: 'AdminblogCtrl'
    })
        .otherwise({
        redirectTo: '/'
    });

    $locationProvider
        .html5Mode(true);
});





/*

lotart.controller('headController', function($scope, PageTitle, MetaInformation){
    $scope.title = PageTitle.title();
    MetaInformation.setMetaDescription('Mazliet par Franciju, mazliet par šo un to');
    $scope.metaDescr = MetaInformation.metaDescription();      
});*/