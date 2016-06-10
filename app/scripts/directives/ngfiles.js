'use strict';

/**
 * @ngdoc directive
 * @name lotartApp.directive:ngFiles
 * @description
 * # ngFiles
 */
angular.module('lotartApp')
    .directive('ngFiles', function ($parse) {
    function uploadLink(scope, element, attrs) {
        console.log('esmu direktivaa');
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { 
                $files: event.target.files 
            });
            console.log('happened');
        });
    }
    
    return {
        link: uploadLink
    };

});
