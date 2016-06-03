lotart.controller('BlogPostController', function($scope, $http, $state, AuthenticationService) {


    var token = 'not working';
    if (localStorage['token']){
        try {
            token = JSON.parse(localStorage['token']);
            token = token.replace(/"/g, "");

        } catch (e){
            console.log('error');
        }
        
    } 
    AuthenticationService.checkToken(token);


    $scope.blogForm = {};
    $scope.blogForm.title = '';
    $scope.blogForm.music = '';
    $scope.blogForm.content  = '';
    $scope.blogForm.postType  = 'blog';
    $scope.blogForm.uploadStatus = 'Save post';

    $scope.blogForm.submitTheForm = function(item, event) {
        $scope.blogForm.uploadStatus = 'Saving...';
        console.log("--> Submitting form");

        var dataObject = {
            title : $scope.blogForm.title,
            content  : $scope.blogForm.content,
            category: $scope.blogForm.postType,
            music: $scope.blogForm.music
        };

        var responsePromise = $http.post('/slim/db-operation.php/article_add', dataObject, {});
        responsePromise.success(function(dataFromServer, status, headers, config) {
            $scope.blogForm.upload(dataFromServer);           
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");
        });            
    }

    $scope.blogForm.files = {};
    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        $scope.blogForm.files = $files;
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };

    $scope.blogForm.upload = function(articleId) {
        console.log(articleId);

        formdata.append('article', articleId);

        var request = {
            method: 'POST',
            url: '/slim/db-operation.php/image_add',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        };

        // SEND THE FILES.
        if ($scope.blogForm.files.length >=1) {
            $http(request)
                .success(function (d) {
                if (d!=false){
                    $scope.blogForm.uploadStatus = "Saved";  
                    console.log(d);
                } else {
                    $scope.blogForm.uploadStatus = "Try again"; 
                }

            })
                .error(function () {
                $scope.blogForm.uploadStatus = "Try again"; 
            });
        } else {
            $scope.blogForm.uploadStatus = "Saved";
        }


    }
});