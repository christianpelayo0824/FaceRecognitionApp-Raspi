// Service for communicating service endpoint
mainApp.service('EmployeeInformationService', ['$http', function ($http) {

    // Rest endpoint base URL
    var BASE_LINK = 'http://localhost:8080/api/resource/career';

    // Update career profile rest end point as service
    this.updateCareerProfile = function (emplCareer) {
        return $http({
            method: 'PUT',
            url: BASE_LINK + '/updateCareerProfile',
            data: {
                id: emplCareer.id,
                department: emplCareer.department,
                position: emplCareer.position,
                station: "A",
                employee_id: emplCareer.employeeid,
                employee: {
                    e_id: emplCareer.id,
                    firstname: emplCareer.firstname,
                    lastname: emplCareer.lastname,
                    phone: emplCareer.phone,
                    email: emplCareer.email
                }
            }
        })
    }


    // Delete career profile rest end point as service
    this.deleteCareerProfileById = function (id) {
        return $http({
            method: 'DELETE',
            url: BASE_LINK + '/deleteCareerProfileById/' + id
        })
    }

    // Get all Career Profile from the server
    this.getAllCareerProfile = function () {
        return $http({
            method: 'GET',
            url: BASE_LINK + '/getAllCareerProfile'
        })
    }

    // Create Career Profile to the server
    this.createCareerProfile = function (emplCareer) {
        return $http({
            method: 'POST',
            url: BASE_LINK + '/createCareerProfile',
            data: {
                department: emplCareer.department,
                position: emplCareer.position,
                station: "A",
                employee_id: emplCareer.employeeid,
                employee: {
                    firstname: emplCareer.firstname,
                    lastname: emplCareer.lastname,
                    phone: emplCareer.phone,
                    email: emplCareer.email
                }
            }
        });
    }

    // Setter
    this.setEmployee = function (data) {
        // Undefined data trapping
        if (data == undefined) {
            this.employee = undefined;
        } else {
            this.employee = {
                employeeid: data.employeeid,
                firstname: data.firstname,
                lastname: data.lastname,
                phone: data.phone,
                email: data.email,
                department: data.department,
                position: data.position
            }
        }
    }

    this.setEmployeeWithId = function (data) {
        // Undefined data trapping
        if (data == undefined) {
            this.employee = undefined;
        } else {
            this.employee = {
                id: data.id,
                employeeid: data.employeeid,
                firstname: data.firstname,
                lastname: data.lastname,
                phone: data.phone,
                email: data.email,
                department: data.department,
                position: data.position
            }
        }
    }

    // Getter
    this.getEmployee = function () {
        return this.employee;
    }
}]);