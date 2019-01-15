// Service for communicating service endpoint
mainApp.service('LogoutEmployeeService', ['$http', function ($http) {

    // Rest endpoint base URL
    var BASE_LINK = 'http://localhost:8080/api/resource/logoutEmployee';

    this.getAllLogoutEmployee = function () {
        return $http({
            method: 'GET',
            url: BASE_LINK + '/getAllLogoutEmployee'
        })
    }
}]);