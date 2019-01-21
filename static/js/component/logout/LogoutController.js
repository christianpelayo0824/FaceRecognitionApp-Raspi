mainApp.controller('LogoutController', function ($scope, $location) {


    $scope.redirectToHome = function () {
        $location.path('/landingPage');
    };

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
            // var data = JSON.stringify(message);
            // var object = JSON.parse(data);
            // console.log(object.department);
            if (message.status == 'isEmpty') {
                swal({
                    title: "Error!",
                    text: "Atleast one person added to the system.",
                    icon: "error"
                });
            }

            if (message.status == 'OUT') {
                // console.log(message.data.firstname);
                var name = document.getElementById('name');
                var position = document.getElementById('position');
                var department = document.getElementById('department');
                var employee_id = document.getElementById('employee_id');
                name.innerHTML = message.data.firstname + " " + message.data.lastname;
                employee_id.innerHTML = message.data.employee_id;
                position.innerHTML = message.data.position;
                department.innerHTML = message.data.department;
            }

            // if (message.status == 'UNKNOWN') {
            //     // console.log(message.data.firstname);
            //     var name = document.getElementById('name');
            //     var position = document.getElementById('position');
            //     var department = document.getElementById('department');
            //     var employee_id = document.getElementById('employee_id');
            //     name.innerHTML = 'UNKNOWN';
            //     employee_id.innerHTML = 00000000;
            //     position.innerHTML = 'POSITION';
            //     department.innerHTML = 'DEPARTMENT';
            // }
        })
    }
});