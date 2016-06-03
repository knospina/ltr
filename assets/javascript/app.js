var lotart = angular.module("lotart", ['textAngular', 'ngSanitize', '720kb.socialshare', 'ui.router', 'angularUtils.directives.dirDisqus', 'ngAnimate', 'ngTouch']);

lotart.controller('headController', function($scope, PageTitle, MetaInformation){
    $scope.title = PageTitle.title();
    MetaInformation.setMetaDescription('Mazliet par Franciju, mazliet par šo un to');
    $scope.metaDescr = MetaInformation.metaDescription();      
});