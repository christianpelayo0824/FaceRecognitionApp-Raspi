mainApp.controller('DataController', function (EmployeeInformationService, $scope, $location, $interval) {

    $scope.centralData = function () {
        $location.path('/centraldata');
    }

    $scope.loginData = function () {
        $location.path('/logindata');
    }

    $scope.logoutData = function () {
        $location.path('/logoutdata');
    }

    $scope.redirectToHome = function () {
        $location.path('/landingPage');
    }
})