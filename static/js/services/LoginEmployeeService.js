// Service for communicating service endpoint
mainApp.service('LoginEmployeeService', ['$http', function ($http) {

    // Rest endpoint base URL
    var BASE_LINK = 'http://localhost:8080/api/resource/loginEmployee';

    this.getAllLoginEmployee = function () {
        return $http({
            method: 'GET',
            url: BASE_LINK + '/getAllLoginEmployee'
        })
    }
}]);