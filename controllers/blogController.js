lotart.controller('BlogController', function($scope, $http, $location, $timeout) {    
    $scope.posts = {};
    $scope.category = $location.path().substr(1);

    /* Returns all posts */
    var response = $http.get("/slim/db-operation.php/");
    response.success(function(data){
        $scope.posts = data;
        console.log($scope.posts);
    });

    /* Opens single post */
    $scope.openArticle = function(articleId){
        $location.path('/article/'+articleId);  
    };

    /* Share article */
    $scope.shareArticle= function(articleId){
        console.log("I tried to share" + articleId);  
    };

});