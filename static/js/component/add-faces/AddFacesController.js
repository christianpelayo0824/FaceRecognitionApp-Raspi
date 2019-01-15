mainApp.controller('AddFacesController', function ($scope, $location, EmployeeInformationService) {

    // Getter reciever
    if (EmployeeInformationService.getEmployee() == undefined) {
        console.log('UNDEFINED');
    } else {
        $scope.emp = {
            employeeid: EmployeeInformationService.getEmployee().employeeid,
            firstname: EmployeeInformationService.getEmployee().firstname,
            lastname: EmployeeInformationService.getEmployee().lastname,
            phone: EmployeeInformationService.getEmployee().phone,
            email: EmployeeInformationService.getEmployee().email,
            department: EmployeeInformationService.getEmployee().department,
            position: EmployeeInformationService.getEmployee().position
        }
    }

    // Data binding in nextButton function
    $scope.nextButton = function (data) {
        try {
            if (data.employeeid != undefined &&
                data.firstname != undefined &&
                data.lastname != undefined &&
                data.phone != undefined &&
                data.email != undefined &&
                data.employeeid != "" &&
                data.firstname != "" &&
                data.lastname != "" &&
                data.phone != "" &&
                data.email != "") {
                EmployeeInformationService.setEmployee(data);
                $location.path('/addfacestwo')
            } else {
                swal("Warning!", "Invalid email", "warning");
            }
        } catch (error) {
            swal("Warning!", "Please fill credentials correctly", "warning");
        }
    };

    // Redirect page to landing page
    $scope.redirectToHome = function () {
        $location.path('/landingPage')
    };
});