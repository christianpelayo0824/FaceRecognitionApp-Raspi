var mainApp = angular.module('mainApp', ['ngRoute', 'ngAnimate'])

mainApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.
        when('/landingPage', {
            templateUrl: '../static/js/component/landing-page/landingpage.html',
            controller: 'LandingPageController'
        }).
        otherwise({
            redirectTo: '/landingPage'
        });
}]);