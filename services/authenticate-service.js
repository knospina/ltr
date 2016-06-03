lotart.service('AuthenticationService', ['$http', '$state', function($http, $state){
    var self = this;
    self.checkToken = function(token){
        var data = {
            token: token
        };
        $http.post('/slim/db-operation.php/check-token', data).success(function(response){
           if (response === 'unauthorized'){
               $state.go('home');
           } else {
               return response;
           }
        }).error(function(error){
            $state.go('home');
        });

    }
}]);