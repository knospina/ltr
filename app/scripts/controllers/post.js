'use strict';

/**
 * @ngdoc function
 * @name lotartApp.controller:PostCtrl
 * @description
 * # PostCtrl
 * Controller of the lotartApp
 */
angular.module('lotartApp')
    .controller('PostCtrl', function ($scope, $location, fetchData, authenticateService) {

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

    $scope.blogForm = {
        title: '',
        music: '',
        content: '',
        postType: 'blog',
        uploadStatus: 'Save post'
    };

    $scope.blogForm.submitTheForm = function() {
        $scope.blogForm.uploadStatus = 'Saving...';
        console.log('--> Submitting form');

        var dataObject = {
            title : $scope.blogForm.title,
            content  : $scope.blogForm.content,
            category: $scope.blogForm.postType,
            music: $scope.blogForm.music
        };

        fetchData.addPost(dataObject)
            .then(function(response){
            $scope.blogForm.upload(response.data);
        }, function(error){
            console.log('Error was received: ' + error);
        });
    };

    $scope.blogForm.files = {};
    var formdata = new FormData();

    $scope.getTheFiles = function ($files) {
        $scope.blogForm.files = $files;
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };

    $scope.blogForm.upload = function(id) {

        console.log(id);

        formdata.append('article', id);
        console.log(formdata);

        // SEND THE FILES.
        if ($scope.blogForm.files.length >=1) {

            fetchData.addImage(formdata)
                .then(function(response){
                console.log('this ended `1');
                
                console.log(response);

                if (response){
                    $scope.blogForm.uploadStatus = 'Saved';  
                    console.log(response);
                } else {
                    $scope.blogForm.uploadStatus = 'Try again'; 
                    console.log('kaut kas fail');
                }

            }, function(error){
                console.log('Error was received: ' + error);
            });

        } else {
            $scope.blogForm.uploadStatus = 'Saved';
            console.log('vispar else');
        }

    };

});
