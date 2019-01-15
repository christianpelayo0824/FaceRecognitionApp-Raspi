import cv2
import numpy as np
import urllib.request as ur

# BASE_URL = 'http://192.168.254.100:8080/shot.jpg'
# BASE_URL = 'http://192.168.43.214:8080/shot.jpg'
BASE_URL = 'http://172.20.10.9:8080/shot.jpg'
# BASE_URL = 'http://192.168.1.184:8080/shot.jpg'


class Camera(object):

    def __init__(self):
        self.video = cv2.VideoCapture(1)

    def __del__(self):
        self.video.release()

    def ip_camera(self, gray_scale=False):
        image_response = ur.urlopen(BASE_URL)
        image_num_array = np.array(bytearray(image_response.read()), dtype=np.uint8)
        frame = cv2.imdecode(image_num_array, -1)
        if gray_scale:
            cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        return frame

    def get_frame(self, gray_scale=False):

        _, frame = self.video.read()

        if gray_scale:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        return frame

    def show_frame(self, seconds, gray_scale=False):

        _, frame = self.video.read()
        if gray_scale:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        cv2.imshow('SnapShot', frame)
        key_pressed = cv2.waitKey(seconds * 1000)

        return key_pressed & 0xFF


if __name__ == '__main__':
    VC = Camera()
    while True:
        KEY = VC.show_frame(1, True)
        if KEY == 27:
            break
    VC.show_frame(1)
