lotart.directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
} ]);

lotart.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(' + value +')',
                'background-size' : 'cover'
            });
        });
    };
});

lotart.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return { 'h': w.height(), 'w': w.width() };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.style = function () {
                if (scope.windowWidth > 800){
                    return { 
                        'height': (newValue.w/3) + 'px'
                    };
                } else if (scope.windowWidth > 400 && scope.windowWidth <= 800){
                    return { 
                        'height': (newValue.w/2) + 'px'
                    };
                } else {
                    return { 
                        'height': (newValue.w/1) + 'px'
                    };
                }

            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
});