mainApp.service('LogoutEmployeeService', ['$http', function ($http) {

    // Rest endpoint base URL
    var BASE_LINK = 'http://10.42.0.1:8080/api/resource/logoutEmployee';

    this.getAllLogoutEmployee = function () {
        return $http({
            method: "GET",
            url: BASE_LINK + '/getAllLogoutEmployee'
        })
    }

    this.currentTimeGapStatus = function (employeeId) {
        return $http({
            method: "POST",
            url: BASE_LINK + "/currentTimeGap",
            data: {
                "employeeId": employeeId,
                "physicalStation": "B"
            }
        })
    }

    this.isSetEmergencyReason = function (reason) {
        return $http({
            method: "POST",
            url: BASE_LINK + "/isSetEmergencyReason",
            data: {
                "reason": reason
            }
        })
    }


}]);