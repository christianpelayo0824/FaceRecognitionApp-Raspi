import cv2
import os
import sys
import json
import lib.face_corrector as op

from lib.camera import Camera
from lib.face_detector import FaceDetector

DATABASE_DIR = './engine/database/faces/'
FACE_CASCADES = './engine/cascades/data/haarcascade_frontalface_alt.xml'

# Testing
# DATABASE_DIR = '../engine/database/faces/'
# FACE_CASCADES = 'cascades/data/haarcascade_frontalface_alt.xml'


def get_images(frame, faces_coord, shape):
    if shape == "rectangle":
        faces_img = op.cut_face_rectangle(frame, faces_coord)
        frame = op.draw_face_rectangle(frame, faces_coord)
    faces_img = op.normalize_intensity(faces_img)
    faces_img = op.resize(faces_img)
    return frame, faces_img


def add_faces():
    if not os.path.exists(DATABASE_DIR):
        os.mkdir(DATABASE_DIR)
    # face_id = input('Name: ')
    face_id = sys.argv[1]
    face_dir = DATABASE_DIR + face_id
    if not os.path.exists(face_dir):
        os.mkdir(face_dir)
        camera = Camera()
        face_detector = FaceDetector(FACE_CASCADES)
        counter = 1
        timer = 0
        cv2.namedWindow('Video Feed', cv2.WINDOW_AUTOSIZE)
        cv2.namedWindow('Saved Face', cv2.WINDOW_NORMAL)
        while counter < 6:
            frame = camera.get_frame()
            # frame = camera.ip_camera(True)
            face_coordinate = face_detector.detect(frame)
            if len(face_coordinate):
                shape = 'rectangle'
                frame, face_image = get_images(frame, face_coordinate, shape)
                if timer % 100 == 20:
                    cv2.imwrite(face_dir + '/' + str(counter) + '.jpg', face_image[0])
                    print(json.dumps({
                        'imageCounter': str(counter)
                    }))
                    counter += 1
                    cv2.imshow('Saved Face', face_image[0])

            cv2.imshow('Video Feed', frame)
            cv2.waitKeyEx(50)
            timer += 20
            if cv2.waitKey(100) & 0xFF == 27:
                sys.exit()
    else:
        print(json.dumps({
            'message': 'Face ID already exist',
            'status': 'false'
        }))


if __name__ == '__main__':
    add_faces()
