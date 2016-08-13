from flask import Flask, render_template, Response
import time
import serial

ser = serial.Serial('/dev/tty.usbmodem14211', 9600)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/stream")
def stream():
    def eventStream():
        while True:
            x = ser.readline()
            print x
            yield "data:{}\n\n".format(x)
    return Response(eventStream(), mimetype="text/event-stream")
