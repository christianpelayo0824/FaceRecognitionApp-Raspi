mainApp.controller('LoginDataController', function (LoginEmployeeService, $scope, $location, $interval) {


    $scope.redirectToData = function () {
        $location.path('/data');
    }

    // Function to display empoyee information in table form
    test = function () {
        LoginEmployeeService.getAllLoginEmployee()
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
                    $scope.loginEmployee = response.data;
                    console.log($scope.loginEmployee)
                }

            })
    }

    // Initialize function to get data every start load in this controller
    test();
})