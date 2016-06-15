'use strict';

/**
 * @ngdoc function
 * @name lotartApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the lotartApp
 */
angular.module('lotartApp')
    .controller('EditCtrl', function ($scope, $location, authenticateService, fetchData) {

    var token = 'not working';
    if (localStorage.token){
        try {
            token = JSON.parse(localStorage.token);
            token = token.replace(/"/g, '');
        } catch (e){
            console.log('error');
        }

    } 
    authenticateService.checkToken(token);

    /* Getting old data */
    $scope.blogForm = {
        'title'         : '',
        'music'         : '',
        'content'       : '',
        'postType'      : '',
        'uploadStatus'  : 'Update post'
    };

    var id = $location.path().split('/')[2];

    fetchData.onePost(id)
        .then(function(response){
        console.log(response);  

        $scope.blogForm.title = response.data[0].TITLE;
        $scope.blogForm.music = response.data[0].MUSIC;
        $scope.blogForm.content = response.data[0].CONTENT;
        $scope.blogForm.postType = response.data[0].CATEGORY;
    }, function(error){
        console.log('Error was received: ' + error);
    });


    $scope.blogForm.submitTheForm = function() {
        $scope.blogForm.uploadStatus = 'Updating...';
        console.log('--> Submitting form');

        var data = {
            id : id,
            title : $scope.blogForm.title,
            content  : $scope.blogForm.content,
            music  : $scope.blogForm.music,
            category: $scope.blogForm.postType
        };

        fetchData.updatePost(data)
            .then(function(response){
            $scope.blogForm.uploadStatus = 'Updated';
            console.log(response);
        }, function(error){
            console.log('Error was received: ' + error);
        });

    };

});





