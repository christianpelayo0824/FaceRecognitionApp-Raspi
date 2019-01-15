import os
import json
import shutil
import sys


def remove_face():
    # DATABASE_DIR = '../engine/database/faces/'
    DATABASE_DIR = './engine/database/faces/'

    if not os.path.exists(DATABASE_DIR):
        print(json.dumps({
            'message': 'Database directory not exist'
        }))
    # face_id = 12345678
    face_id = sys.argv[1]
    face_dir = DATABASE_DIR + str(face_id)
    if not os.path.exists(face_dir):
        print(json.dumps({
            'message': 'Face folder not exist',
            'status': 'false'
        }))
    else:
        shutil.rmtree(face_dir)
        print(json.dumps({
            'message': 'Folder Deleted',
            'status': 'true'
        }))


if __name__ == '__main__':
    remove_face()
