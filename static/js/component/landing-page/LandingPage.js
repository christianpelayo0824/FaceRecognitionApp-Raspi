mainApp.controller('LandingPageController', function ($scope) {
    particlesJS.load('particles-js', '../static/js/particle.json', function () {
        console.log('particles.js loaded - callback');
    });

    // Bind python script using python-shell js library
    // $scope.recognize = function () {
    //     var python = require('python-shell');
    //     var options = {
    //         mode: 'json',
    //         encoding: 'utf8',
    //         pythonOptions: ['-u'],
    //         scriptPath: './engine/',
    //         args: null,
    //         pathonPath: '/engine/venv/bin/python3.5'
    //     };

    //     var py = new python.PythonShell('/face_recognition.py', options);
    //     py.on('message', function (message) {
    //         var data = JSON.stringify(message);
    //         var object = JSON.parse(data);
    //         console.log(object);
    //         if (object.status == 'isEmpty') {
    //             swal({
    //                 title: "Error!",
    //                 text: "Atleast one person added to the system.",
    //                 icon: "error",
    //             });
    //         }
    //     })
    // }
});