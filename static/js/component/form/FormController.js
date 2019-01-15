mainApp.controller('FormController', function (EmployeeInformationService, $scope, $location) {
    // Getter reciever
    if (EmployeeInformationService.getEmployee() == undefined) {
        console.log('UNDEFINED');
    } else {
        $scope.emp = {
            id: EmployeeInformationService.getEmployee().id,
            employeeid: EmployeeInformationService.getEmployee().employeeid,
            firstname: EmployeeInformationService.getEmployee().firstname,
            lastname: EmployeeInformationService.getEmployee().lastname,
            phone: EmployeeInformationService.getEmployee().phone,
            email: EmployeeInformationService.getEmployee().email,
            department: EmployeeInformationService.getEmployee().department,
            position: EmployeeInformationService.getEmployee().position
        }
    }

    $scope.redirectToHome = function() {
        $location.path('/data')
    }

    $scope.updateButton = function () {
        EmployeeInformationService.updateCareerProfile($scope.emp).
            then(function (data) {
                if (data.status == 200) {
                    swal({
                        title: "Yaassshh!",
                        text: "Profile successfuly updated!",
                        icon: "success",
                        button: "Okay",
                    }).then(function () {
                        window.location.href = '#!/data';
                        $scope.emp = null;
                        EmployeeInformationService.setEmployeeWithId($scope.emp);
                    });
                }
            });

    }
});