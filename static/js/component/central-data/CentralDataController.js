mainApp.controller('CentralDataController', function (EmployeeInformationService, $scope, $location, $interval) {

    // Gloabl Variables
    var globalEmployee = $scope.employee;

    $scope.updateCareerProfile = function (emp) {
        employeeObj = {
            id: emp.id,
            employeeid: emp.employee_id,
            firstname: emp.employee.firstname,
            lastname: emp.employee.lastname,
            phone: emp.employee.phone,
            email: emp.employee.email,
            department: emp.department,
            position: emp.position
        }
        // console.log(employeeObj)
        EmployeeInformationService.setEmployeeWithId(employeeObj);
        $location.path('/form');
    }


    $scope.deleteCareerProfile = function (emp) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // this block is to communicatie remove_face.py script from 
                    // the engine python module
                    var python = require('python-shell');
                    var options = {
                        mode: 'json',
                        encoding: 'utf8',
                        pythonOptions: ['-u'],
                        scriptPath: './engine/',
                        args: [emp.employee_id],
                        pathonPath: '/engine/venv/bin/python3.5'
                    };
                    var py = new python.PythonShell('remove_face.py', options);
                    py.on('message', function (message) {
                        var data = JSON.stringify(message);
                        var object = JSON.parse(data);
                        console.log(object)
                        // Verify script status
                        if (object.status = false) {
                            console.log('Not Exist')
                        } else {
                            //  Delete career profile using angular service - EmployeeInformationService
                            EmployeeInformationService.deleteCareerProfileById(emp.id)
                                .then(function (response) {
                                    if (response.status == 200) {
                                        swal("Poof! Your data has been deleted!", {
                                            icon: "success",
                                        });
                                        globalEmployee.splice(globalEmployee.indexOf(emp), 1)
                                    }
                                })
                        }
                    })

                }
            });
    }

    $scope.redirectToData = function () {
        $location.path('/data');
    }

    // Function to display empoyee information in table form
    test = function () {
        EmployeeInformationService.getAllCareerProfile()
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
                    $scope.employee = response.data;
                    globalEmployee = response.data;
                }

            })
    }

    // Initialize function to get data every start load in this controller
    test();
})