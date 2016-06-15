'use strict';

/**
 * @ngdoc function
 * @name lotartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lotartApp
 */
angular.module('lotartApp')
    .controller('MainCtrl', function ($scope, fetchData) {

    $scope.dates = {};

    fetchData.allDates()
        .then(function(response){
        $scope.parseDates(response.data);
    }, function(error){
        $scope.posts = 'Error was received: ' + error;
    });

    $scope.parseDates = function(timestamps) {
        let arrLength = timestamps.length;
        let temp = '', year = '', month='';
        for (let i = 0; i < arrLength; i++) {
            temp = new Date(parseInt(timestamps[i].TIME)*1000);
            year = temp.getFullYear();
            month = temp.getMonth() + 1;
            if (!$scope.dates.hasOwnProperty(year)){
                $scope.dates[year] = [];
            }
            if ($scope.dates[year].indexOf(month) < 0){
                $scope.dates[year].push(month);
            }
        }
    };


});
