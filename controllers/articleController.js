lotart.controller('ArticleController', function($scope, $http, $location, $state) {
    $scope.post = {};
    var id = $location.path().split('/')[2];  
    $scope.disqusConfig = {
        disqus_shortname: '',
        disqus_identifier: '',
        disqus_url: '',
        disqus_title: '',
        disqus_image: '',
        disqus_description: ''
    };  

    $http
        .get('/slim/db-operation.php/article/' + id, {})
        .success(function(dataFromServer, status, headers, config) {
        if (dataFromServer.length > 0){
            $scope.post = dataFromServer;   
            $scope.disqusConfig = {
                disqus_shortname: 'lotart',
                disqus_identifier: id,
                disqus_url: $location.absUrl(),
                disqus_title: $scope.post[0].TITLE,
                disqus_description: $scope.post[0].CONTENT
            };  
            if ($scope.post[0].IMAGES[0].SRC) {
                $scope.disqusConfig.disqus_image = $scope.post[0].IMAGES[0].SRC;
            }
        } else {
            $state.go('home');
        }

    })
        .error(function(data, status, headers, config) {
        console.log("Request went wrong");
    });  

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
        }
    };

});