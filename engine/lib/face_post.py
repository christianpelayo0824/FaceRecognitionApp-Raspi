import requests
import json

BASE_LINK = "http://localhost:8080/api/resource"


def login_employee_by_id(employee_id):
    payload = {
        'employeeId': str(employee_id)
    }
    url = BASE_LINK + "/loginEmployee/saveLoginEmployee"
    requests.post(url, json=payload)


def logout_employee_by_id(employee_id):
    payload = {
        'employeeId': str(employee_id)
    }
    url = BASE_LINK + "/logoutEmployee/saveLogoutEmployee"
    r = requests.post(url, json=payload)
    print(r.text)


def get_all_login_employee():
    req = requests.get("http://localhost:8080/api/resource/loginEmployee/getAllLoginEmployee")
    print(req.json())


def get_current_time_gap(employee_id):

    url = BASE_LINK + "/logoutEmployee/currentTimeGap/" + str(employee_id)
    req = requests.post(url)
    # print(req.json())
    print(json.dumps({
        'status': str(req.json())
    }))

# get_all_login_employee()
# logout_employee_by_id(12345678)
# get_current_time_gap(12345678)
