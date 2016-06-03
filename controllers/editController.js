lotart.controller('EditController', function($scope, $http, $location, $state, AuthenticationService) {

    var token = 'not working';
    if (localStorage['token']){
        try {
            token = JSON.parse(localStorage['token']);

        } catch (e){
            return;
        }
        token = token.replace(/"/g, "");
    } 

    AuthenticationService.checkToken(token);

    /* Getting old data */
    $scope.blogForm = {
        'title'     : '',
        'music'     : '',
        'content'   : '',
        'postType'  : ''
    };

    var id = $location.path().split('/')[2];
    var responsePromise = $http.get('/slim/db-operation.php/article/' + id, {});
    responsePromise.success(function(dataFromServer, status, headers, config) {
        console.log(dataFromServer);  

        $scope.blogForm.title = dataFromServer[0].TITLE;
        $scope.blogForm.music = dataFromServer[0].MUSIC;
        $scope.blogForm.content = dataFromServer[0].CONTENT;
        $scope.blogForm.postType = dataFromServer[0].CATEGORY;
    });
    responsePromise.error(function(data, status, headers, config) {
        alert("Submitting form failed!");
    });  

    $scope.blogForm.uploadStatus = 'Update post';

    console.log($scope.blogForm);

    $scope.blogForm.submitTheForm = function(item, event) {
        $scope.blogForm.uploadStatus = 'Updating...';
        console.log("--> Submitting form");

        var dataObject = {
            id : id,
            title : $scope.blogForm.title,
            content  : $scope.blogForm.content,
            music  : $scope.blogForm.music,
            category: $scope.blogForm.postType
        };

        console.log(dataObject);

        var responsePromise = $http.put('/slim/db-operation.php/update_article', dataObject, {});
        responsePromise.success(function(dataFromServer, status, headers, config) {
            //$scope.blogForm.upload(dataFromServer);  
            $scope.blogForm.uploadStatus = 'Updated';
            console.log(dataFromServer);
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");
        });            
    }
});
