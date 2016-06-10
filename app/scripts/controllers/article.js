'use strict';

/**
 * @ngdoc function
 * @name lotartApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the lotartApp
 */
angular.module('lotartApp')
    .controller('ArticleCtrl', function ($scope, $location, fetchData) {

    $scope.post = {};
    var id = $location.path().split('/')[2];  
    $scope.disqusConfig = {
        /*jshint ignore:start*/
        disqus_shortname: '',
        disqus_identifier: '',
        disqus_url: '',
        disqus_title: ''
        /*jshint ignore:end*/
    };  

    fetchData.onePost(id)
        .then(function(response){
        $scope.posts = response.data;

        if (response.data.length > 0){
            $scope.post = response.data;   
            $scope.disqusConfig = {
                /*jshint ignore:start*/
                disqus_shortname: 'lotart',
                disqus_identifier: id,
                disqus_url: $location.absUrl(),
                disqus_title: $scope.post[0].TITLE
                /*jshint ignore:end*/
            };  
        } else {
            $location.path('/');  
        }

    }, function(error){
        $scope.posts = 'Error was received: ' + error;
    });


    /* Gallery Start */

    // initial image index
    $scope._Index = -1;

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

    // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.post[0].IMAGES.length - 1;
    };

    // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.post[0].IMAGES.length - 1) ? ++$scope._Index : 0;
    };

    $scope.sliderHide = {
        'display':'none'
    };
    $scope.sliderHeight = {
        'height': '85px'
    };

    // show a certain image
    $scope.showPhoto = function (index) {
        if ($scope._Index === -1){
            console.log('was hidden before');
        }
        $scope._Index = index;
        $scope.sliderHeight = {
            'height': '500px'
        };
        $scope.sliderHide = {
            'display':'block'
        };
    };

    /* Gallery End */

});