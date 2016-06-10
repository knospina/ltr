'use strict';

/**
 * @ngdoc directive
 * @name lotartApp.directive:fileUpload
 * @description
 * # fileUpload
 */
angular.module('lotartApp')
    .directive('fileUpload', function () {
    return {
        template: '<div></div>',
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
            element.text('this is the fileUpload directive');
            console.log(attrs);
        }
    };
});
