import pymysql
import json
from time import sleep

conn = pymysql.connect(
    host='10.42.0.1',
    user='root',
    password='root',
    db='central_db',
)


def get_face_profile(uid):
    try:
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        query = 'SELECT * FROM employee t1 JOIN job_description \
        t2 ON t1.e_id = t2.id WHERE t2.employee_id =' + str(uid)
        cursor.execute(query)
        data = cursor.fetchone()
        sleep(.5)
    except Exception as e:
        print(json.dumps({
            "error": str(e)
        }))
    return data


