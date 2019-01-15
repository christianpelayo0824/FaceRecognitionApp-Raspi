mainApp.controller('LogoutDataController', function (LogoutEmployeeService, $scope, $location, $interval) {


    $scope.redirectToData = function () {
        $location.path('/data');
    }

    // Function to display empoyee information in table form
    test = function () {
        LogoutEmployeeService.getAllLogoutEmployee()
            .then(function (response) {
                if (response.data.length == 0) {
                    console.log('response')
                    swal({
                        title: "Oopss! Empty",
                        text: "Database is empty",
                        icon: "warning",
                        buttons: "OK",
                    })
                } else {
                    $scope.logoutEmployee = response.data;
                    console.log($scope.logoutEmployee)
                }

            })
    }

    // Initialize function to get data every start load in this controller
    test();
})