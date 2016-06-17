'use strict';

/**
 * @ngdoc function
 * @name lotartApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the lotartApp
 */
angular.module('lotartApp')
    .controller('MenuCtrl', function ($scope, fetchData) {
    $scope.dates = [];

    const months = ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris'];

    fetchData.allDates()
        .then(function(response){
        $scope.parseDates(response.data);
    }, function(error){
        $scope.posts = 'Error was received: ' + error;
    });

    $scope.parseDates = function(timestamps) {
        let arrLength = timestamps.length;
        let temp = '', year = '', month='', monthNr=0;
        let item = {};

        for (let i = 0; i < arrLength; i++) {
            temp = new Date(parseInt(timestamps[i].TIME)*1000);
            year = temp.getFullYear();
            monthNr = temp.getMonth();
            month = months[monthNr];
            monthNr++;

            if ($scope.dates.length === 0){ // Šis ir ok
                item.year = year;
                item.months = [];
                item.months.push({nr: monthNr, name: month});
                $scope.dates.push(item);
                item = {};

            } else {
                let missingYear = false;
                let missingMonth = false;
                
                let yearsLength = $scope.dates.length-1;

                if (year === $scope.dates[yearsLength].year){

                    if ($scope.dates[yearsLength].months[$scope.dates[yearsLength].months.length-1].nr !== monthNr){
                        missingMonth = true;                            
                    }

                } else {
                    missingYear = true;
                    missingMonth = true;
                }

                if (missingYear || missingMonth) {
                    if (missingYear){
                        //push month and year
                        item.year = year;
                        item.months = [];
                        item.months.push({nr: monthNr, name: month});
                        $scope.dates.push(item);
                        item = {};
                    } else {
                        //push only month
                        $scope.dates[$scope.dates.length-1].months.push({nr: monthNr, name: month});
                    }
                    missingYear = false;
                    missingMonth = false;
                }

            }

        }

    };
});
