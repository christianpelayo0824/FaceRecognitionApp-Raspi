mainApp.controller('AddFacesTwoController', function ($scope, $location, EmployeeInformationService) {

    // Getter data reciever 
    $scope.emp = {
        department: EmployeeInformationService.getEmployee().department,
        position: EmployeeInformationService.getEmployee().position
    }

    // Binding data to backButton function
    $scope.backButton = function (data) {
        employeeObj = {
            employeeid: EmployeeInformationService.getEmployee().employeeid,
            firstname: EmployeeInformationService.getEmployee().firstname,
            lastname: EmployeeInformationService.getEmployee().lastname,
            phone: EmployeeInformationService.getEmployee().phone,
            email: EmployeeInformationService.getEmployee().email,
            department: data.department,
            position: data.position
        }
        EmployeeInformationService.setEmployee(employeeObj);
        $location.path('/addfaces');
    }

    // Binding data to nextButton function
    $scope.nextButton = function (data) {
        employeeObj = {
            employeeid: EmployeeInformationService.getEmployee().employeeid,
            firstname: EmployeeInformationService.getEmployee().firstname,
            lastname: EmployeeInformationService.getEmployee().lastname,
            phone: EmployeeInformationService.getEmployee().phone,
            email: EmployeeInformationService.getEmployee().email,
            department: data.department,
            position: data.position
        }
        EmployeeInformationService.setEmployee(employeeObj);
        $location.path('/addfacesthree');
    }

    // Redirect page to landing page
    $scope.redirectToHome = function () {
        $location.path('/landingPage')
    };
});