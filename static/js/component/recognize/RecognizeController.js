mainApp.controller('RecognizeController', function ($scope, $location) {

    $scope.loginMode = function () {
        console.log("Hit")
        // Bind python script using python-shell js library
        var python = require('python-shell');
        var options = {
            mode: 'json',
            encoding: 'utf8',
            pythonOptions: ['-u'],
            scriptPath: './engine/',
            args: [1],
            pathonPath: '/engine/venv/bin/python3.5'
        };

        var py = new python.PythonShell('/face_recognition.py', options);
        py.on('message', function (message) {
            var data = JSON.stringify(message);
            var object = JSON.parse(data);
            console.log(object);
            if (object.status == 'isEmpty') {
                swal({
                    title: "Error!",
                    text: "Atleast one person added to the system.",
                    icon: "error",
                });
            }
        })

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
            var data = JSON.stringify(message);
            var object = JSON.parse(data);
            console.log(object);
            if (object.status == 'isEmpty') {
                swal({
                    title: "Error!",
                    text: "Atleast one person added to the system.",
                    icon: "error",
                });
            }
        })
    }

    $scope.redirectToHome = function () {
        $location.path('/landingPage');
    }
})