lotart.controller('AdminBlogController', function($scope, $http, $location, $timeout, $state, AuthenticationService) {    

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

    $scope.logout = function(){
        var data = {
            token: token
        }        
        $http.post('/slim/db-operation.php/logout', data).success(function(response){
            console.log(response);
            localStorage.clear();
            $state.go('home');
        }).error(function(error){
            console.log(error);
        });
    };

    $scope.posts = {};
    $scope.comments= {};
    $scope.commentForm = {};
    $scope.commentForm.author= '';
    $scope.commentForm.email= '';
    $scope.commentForm.comment= '';
    $scope.commentForm.commentStatus = 'Save';
    $scope.openArticle = 0;
    $scope.category = $location.path().substr(1);

    /* Returns all posts */
    var response = $http.get("/slim/db-operation.php/");
    response.success(function(data){
        $scope.posts = data;
        console.log($scope.posts);
    });

    /* Edit article */
    $scope.editArticle = function(articleId){
        $location.path('/edit/'+articleId);  
    };

    /* Delete article */
    $scope.deleteArticle= function(articleId){
        var response = $http.delete("/slim/db-operation.php/delete_article/" + articleId);
        response.success(function(data){
            $scope.removePost(articleId);
        }).error(function(data, status, header, config){
            console.log("error");
        });

    };
    $scope.removePost = function(articleId){
        var article = document.getElementById('post-' + articleId);
        article.style.display = 'none';
        console.log('finished');
    };


});