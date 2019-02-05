import serial
import json

try:
    arduino = serial.Serial('/dev/ttyUSB0', 9600)
    print(json.dumps({
        'status': str("Port Found")
    }))
except:
    print(json.dumps({
        'status': str("Port Not Found")
    }))


def open_relay(data):
    arduino.write(data.encode())

