'use strict';

/**
 * @ngdoc service
 * @name lotartApp.authenticateService
 * @description
 * # authenticateService
 * Service in the lotartApp.
 */
angular.module('lotartApp')
    .service('authenticateService', function (fetchData, $location) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.checkToken = function(token){
        var data = {
            token: token
        };

        fetchData.checkToken(data)
            .then(function(response){
            if (response.data === 'unauthorized'){
                $location.path('/');
            } else {
                return response.data;
            }
        }, function(error){
            console.log('Here was an error' + error);
            $location.path('/');
        });

    };

});

