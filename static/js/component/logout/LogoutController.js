mainApp.controller('LogoutController', function ($scope, $location, LogoutEmployeeService) {

    $("#emergencyBtn").hide();

    $scope.redirectToHome = function () {
        $location.path('/landingPage');
    };

    $scope.emergencyReason = function () {
        $("#exampleModalCenter").modal("toggle");
    }

    $scope.logoutMode = function () {
        console.log("Hit")
        var python = require('python-shell');
        var options = {
            mode: 'json',
            encoding: 'utf8',
            pythonOptions: ['-u'],
            scriptPath: './engine/',
            args: [0],
            pathonPath: '/engine/venv/bin/python3.5'
        };

        var py = new python.PythonShell('/face_recognition.py', options);
        py.on('message', function (message) {
            console.log(message);

            var name = document.getElementById('name');
            var position = document.getElementById('position');
            var department = document.getElementById('department');
            var employee_id = document.getElementById('employee_id');
            var status = document.getElementById('status');

            if (message.status == 'isEmpty') {
                swal({
                    title: "Error!",
                    text: "Atleast one person added to the system.",
                    icon: "error"
                });
            }

            if (message.status == 'OUT') {
                LogoutEmployeeService.currentTimeGapStatus(message.data.employee_id)
                    .then(function (response) {
                        console.log(response.data)
                        if (response.data) {
                            status.innerHTML = "UNDER-TIME"
                            status.style.color = "#FF7043"
                            // $("#exampleModalCenter").modal("toggle");
                            $("#emergencyBtn").show();
                        } else {
                            status.innerHTML = "IN-TIME"
                            status.style.color = "#AED581"
                        }
                    })
                name.innerHTML = message.data.lastname + ", " + message.data.firstname;
                employee_id.innerHTML = message.data.employee_id;
                position.innerHTML = message.data.position;
                department.innerHTML = message.data.department;
            }

            // if (message.status == 'False') {
            //     $("#exampleModalCenter").modal("toggle");
            // }
        })
    }
});