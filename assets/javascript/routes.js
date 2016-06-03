lotart.config(function($stateProvider, $locationProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
        url: '/',
        templateUrl : 'pages/home.html',
        controller  : 'BlogController'
    })
        .state('login', {
        url: '/login',
        templateUrl : 'pages/login.html',
        controller  : 'LoginController'
    })
        .state('adminBlog', {
        url: '/admin-blog',
        templateUrl : 'pages/adminBlog.html',
        controller  : 'AdminBlogController'
    })
    /* .state('blog', {
        url: '/blog',
        templateUrl : 'pages/blog.html',
        controller  : 'BlogController'
    })*/
        .state('article', {
        url: '/article/:id',
        templateUrl : 'pages/article.html',
        controller  : 'ArticleController'
    })
        .state('edit', {
        url: '/edit/:id',
        templateUrl : 'pages/edit.html', 
        controller  : 'EditController'
    })
        .state('french', {
        url: '/french',
        templateUrl : 'pages/blog.html',
        controller  : 'BlogController'
    })
        .state('tech', {
        url: '/tech',
        templateUrl : 'pages/blog.html',
        controller  : 'BlogController'
    })
        .state('post', {
        url: '/post',
        templateUrl : 'pages/post.html',
        controller  : 'BlogPostController'
    })

    $locationProvider
        .html5Mode(true);
});