from itertools import starmap

import cv2
import os
import lib.face_corrector as op
import numpy as np
import json
import lib.face_entity as face_entity
import lib.face_post as face_post_module

import sys

from lib.camera import Camera
from lib.face_detector import FaceDetector

# DATABASE_DIR = '../FaceRecognitionApp---Thesis/engine/database/faces/'
# FACE_CASCADES = './engine/cascades/data/haarcascade_frontalface_alt.xml'

# Outsource Database
DATABASE_DIR = '../database/faces/'
FACE_CASCADES = './engine/cascades/data/haarcascade_frontalface_alt.xml'

# For Testing
# DATABASE_DIR = '../engine/database/faces/'
# FACE_CASCADES = 'cascades/data/haarcascade_frontalface_alt.xml'


def get_images(frame, faces_coord, shape):
    if shape == "rectangle":
        faces_img = op.cut_face_rectangle(frame, faces_coord)
        frame = op.draw_face_rectangle(frame, faces_coord)
    faces_img = op.normalize_intensity(faces_img)
    faces_img = op.resize(faces_img)
    return frame, faces_img


def start_recognize():
    shape = 'rectangle'
    try:
        faces = [employee for employee in os.listdir(DATABASE_DIR)]
    except Exception as ex:
        print(json.dumps({
            "message": "Have you added at least one person to the system?" + str(ex),
            "status": "isEmpty"
        }))
        sys.exit()
    print(json.dumps({
        "message": "This are the people in the Recognition System:"
    }))
    for employee in faces:
        print(json.dumps({
            "-": employee
        }))

    choice = 3

    detector = FaceDetector(FACE_CASCADES)
    if choice == 1:
        recognizer = cv2.face.EigenFaceRecognizer_create()
        threshold = 4000
    elif choice == 2:
        recognizer = cv2.face.FisherFaceRecognizer_create()
        threshold = 300
    elif choice == 3:
        recognizer = cv2.face.LBPHFaceRecognizer_create()
        # threshold = 105
        threshold = 80
    images = []
    labels = []
    state = []
    state.append(0)  # default
    labels_faces = {}
    for i, image_person in enumerate(faces):
        labels_faces[i] = image_person
        for image in os.listdir(DATABASE_DIR + image_person):
            images.append(cv2.imread(DATABASE_DIR + image_person + '/' + image, 0))
            labels.append(i)
    try:
        recognizer.train(images, np.array(labels))
    except:
        print(json.dumps({
            "message": "Do you have at least two people in the database",
            "status": "isEmpty"
        }))
        sys.exit()
    video = Camera()
    while True:
        stroke = 1
        color = (136, 150, 0)
        cv2.namedWindow('Frame', cv2.WND_PROP_FULLSCREEN)
        cv2.setWindowProperty('Frame', cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)
        frame = video.get_frame()
        # frame = video.ip_camera(True)
        faces_coord = detector.detect(frame, False)
        if len(faces_coord):
            frame, faces_img = get_images(frame, faces_coord, shape)
            for i, face_img in enumerate(faces_img):
                pred, conf = recognizer.predict(face_img)
                print(json.dumps({
                    'prediction': pred,
                    'Confidence': conf,
                    'Threshold': threshold,
                }))
                if conf < threshold:
                    # Fetch data from face_entity the data from database
                    # to filter the first_name using uid
                    data = face_entity.get_face_profile(labels_faces[pred].capitalize())
                    print(json.dumps({
                        'code': str(data)
                    }))

                    cv2.putText(frame, data['firstname'] + ' | ' + str(round(conf)),
                                (faces_coord[i][0], faces_coord[i][1] - 2),
                                cv2.FONT_HERSHEY_PLAIN, 1.7, color, stroke,
                                cv2.LINE_AA)
                    # Push Available state
                    if state[0] == 0:  # Take note here there is a hole
                        state.append(labels_faces[pred].capitalize())
                    if state[0] != str(labels_faces[pred].capitalize()):
                        if sys.argv[1] == "1":
                            face_post_module.login_employee_by_id(data['employee_id'])
                            print(json.dumps({
                                'status': 'IN',
                                'id': str(data['employee_id'])
                            }))
                        if sys.argv[1] == "0":
                            face_post_module.logout_employee_by_id(data['employee_id'])
                            print(json.dumps({
                                'status': 'OUT',
                                'id': str(data['employee_id'])
                            }))
                        # Pop available state if they are not the same
                        state.pop(0)
                        print(json.dumps({
                            'status': 'POPPPPPPPPPPPPP',
                            "state": str(state[0])

                        }))
                        state.append(labels_faces[pred].capitalize())
                        print(json.dumps({
                            'status': 'HEREEEEEEEEEEE',
                            "state": str(state[0])

                        }))

                else:
                    cv2.putText(frame, "Unknown",
                                (faces_coord[i][0], faces_coord[i][1]),
                                cv2.FONT_HERSHEY_PLAIN, 1.7, color, stroke,
                                cv2.LINE_AA)

        # print(json.dumps({
        #     "test": sys.argv[1],
        #     "state": str(state[0])
        # }))

        if sys.argv[1] == "1":
            if state[0] != 0:
                data = face_entity.get_face_profile(state[0])
                cv2.putText(frame, str(data['firstname'] + ' ' + data['lastname']).upper(),
                            (5, frame.shape[0] - 10),
                            cv2.FONT_HERSHEY_PLAIN, 3, color, 3, cv2.LINE_AA)
        else:
            if state[0] != 0:
                data = face_entity.get_face_profile(state[0])
                cv2.putText(frame, str(data['firstname'] + ' ' + data['lastname']).upper(),
                            (5, frame.shape[0] - 10),
                            cv2.FONT_HERSHEY_PLAIN, 3, color, 3, cv2.LINE_AA)

        cv2.imshow('Frame', frame)

        if cv2.waitKey(100) & 0xFF == 27:
            sys.exit()


if __name__ == '__main__':
    start_recognize()
