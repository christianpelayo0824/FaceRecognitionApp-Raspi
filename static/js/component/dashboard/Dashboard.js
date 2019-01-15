mainApp.controller('DashboardController', function ($scope, EmployeeInformationService, $location) {

    $scope.redirectToHome = function () {
        $location.path('/landingPage');
    }
});