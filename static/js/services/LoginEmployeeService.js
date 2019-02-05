// Service for communicating service endpoint
mainApp.service('LoginEmployeeService', ['$http', function ($http) {

    // Rest endpoint base URL
    var BASE_LINK = 'http://10.42.0.1:8080/api/resource/loginEmployee';

    this.getAllLoginEmployee = function () {
        return $http({
            method: 'GET',
            url: BASE_LINK + '/getAllLoginEmployee'
        })
    }

    this.saveLoginEmployee = function(employeeId) {
        return $http({
            method: "POST",
            url: BASE_LINK + "/saveLoginEmployee",
            data: {
                "employeeId": employeeId,
                "physicalStation": "A"
            }
        })
    }
}]);