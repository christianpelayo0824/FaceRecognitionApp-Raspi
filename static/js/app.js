var mainApp = angular.module('mainApp', ['ngRoute', 'ngAnimate'])

mainApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.
        when('/landingPage', {
            templateUrl: '../static/js/component/landing-page/landingpage.html',
            controller: 'LandingPageController'
        }).
        when('/dashboard', {
            templateUrl: '../static/js/component/dashboard/dashboard.html',
            controller: 'DashboardController'
        }).
        when('/service', {
            templateUrl: '../static/js/component/service/service.html',
            controller: 'ServiceController'
        }).
        when('/addfaces', {
            templateUrl: '../static/js/component/add-faces/addfaces.html',
            controller: 'AddFacesController'
        }).
        when('/addfacestwo', {
            templateUrl: '../static/js/component/add-faces-two/addfacestwo.html',
            controller: 'AddFacesTwoController'
        }).
        when('/addfacesthree', {
            templateUrl: '../static/js/component/add-faces-three/addfacesthree.html',
            controller: 'AddFacesThreeController'
        }).
        when('/data', {
            templateUrl: '../static/js/component/data-page/data.html',
            controller: 'DataController'
        }).
        when('/form', {
            templateUrl: '../static/js/component/form/form.html',
            controller: 'FormController'
        }).
        when('/recognize', {
            templateUrl: '../static/js/component/recognize/recognize.html',
            controller: 'RecognizeController'
        }).
        when('/developer', {
            templateUrl: '../static/js/component/developer/developer.html',
            controller: 'DeveloperController'
        }).
        when('/centraldata', {
            templateUrl: '../static/js/component/central-data/central-data.html',
            controller: 'CentralDataController'
        }).
        when('/logindata', {
            templateUrl: '../static/js/component/login-data/login-data.html',
            controller: 'LoginDataController'
        }).
        when('/logoutdata', {
            templateUrl: '../static/js/component/logout-data/logout-data.html',
            controller: 'LogoutDataController'
        }).
        otherwise({
            redirectTo: '/landingPage'
        });
}]);