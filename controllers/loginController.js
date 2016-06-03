lotart.controller('LoginController', function($scope, $http, $state){
    /*$scope.signUpInfo = {
        username: undefined,
        email   : undefined,
        password: undefined
    }*/

    $scope.loginInfo = {
        username: undefined,
        password: undefined
    }

    /*$scope.signUserUp = function(){
        var data = {
            username: $scope.signUpInfo.username,
            email   : $scope.signUpInfo.email,
            password: $scope.signUpInfo.password
        }

        $http.post('/slim/db-operation.php/signup', data).success(function(response){
            console.log(response);
            localStorage.setItem('token', JSON.stringify(response));
            $state.go('post');
        }).error(function(error){
            console.log('Nop, did not work "Creating new user"', error);
        });
    }*/

    $scope.loginUser = function(){
        var data = {
            username: $scope.loginInfo.username,
            password: $scope.loginInfo.password
        }

        $http.post('/slim/db-operation.php/login', data).success(function(response){
            console.log(response);
            localStorage.setItem('token', JSON.stringify(response));
            $state.go('adminBlog');
        }).error(function(error){
            console.log('Nop, did not work "Creating new user"', error);
        });
    }
});