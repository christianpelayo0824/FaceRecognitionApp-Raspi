import cv2


def resize(images, size=(100, 100)):
    images_norm = []
    for image in images:
        is_color = len(image.shape) == 3
        if is_color:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # using different OpenCV method if enlarging or shrinking
        if image.shape < size:
            image_norm = cv2.resize(image, size, interpolation=cv2.INTER_AREA)
        else:
            image_norm = cv2.resize(image, size, interpolation=cv2.INTER_CUBIC)
        images_norm.append(image_norm)

    return images_norm


def normalize_intensity(images):
    images_norm = []
    for image in images:
        is_color = len(image.shape) == 3
        if is_color:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        images_norm.append(cv2.equalizeHist(image))
    return images_norm


def cut_face_rectangle(image, face_coord):
    images_rectangle = []
    for (x, y, w, h) in face_coord:
        images_rectangle.append(image[y: y + h, x: x + w])
    return images_rectangle


def draw_face_rectangle(image, faces_coord):
    stroke = 3
    color = (99, 30, 233)
    line_length = 20

    for (x, y, w, h) in faces_coord:
        end_coord_x = x + w
        end_coord_y = y + h

        cv2.rectangle(image, (x, y), (end_coord_x, end_coord_y), color, 1)

        # Point D
        cv2.line(image, (end_coord_x, end_coord_y), (end_coord_x, end_coord_y - line_length), color, stroke)
        cv2.line(image, (end_coord_x, end_coord_y), (end_coord_x - line_length, end_coord_y), color, stroke)
        # Point C
        cv2.line(image, (end_coord_x, end_coord_y - w), (end_coord_x, (end_coord_y - w) + line_length), color,
                 stroke)
        cv2.line(image, (end_coord_x, end_coord_y - w), (end_coord_x - line_length, (end_coord_y - w)), color,
                 stroke)
        # Point B
        cv2.line(image, (x, y + h), (x, (y + h) - line_length), color, stroke)
        cv2.line(image, (x, y + h), (x + line_length, (y + h)), color, stroke)

        # Point A
        cv2.line(image, (x, y), (x, y + line_length), color, stroke)
        cv2.line(image, (x, y), (x + line_length, y), color, stroke)

    return image
