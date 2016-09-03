from flask import Flask, render_template, Response
import time
import serial
import random
import threading

app = Flask(__name__)

y = 0

def generateNumbers():
    global y
    threading.Timer(1, printit).start()
    x = random.randrange(-5,6,1)
    y += x
    
def readArduino():
    global y
    threading.Timer(0.01, readArduino).start()
    y = ser.readline()

try:
    ser = serial.Serial('/dev/tty.usbmodem14211', 9600)
    readArduino()
    print "Arduino connected."
except serial.serialutil.SerialException:
        print "Arduino not connected. Generating random numbers."
        #generateNumbers()
        
@app.route('/')
def index():
    return render_template('index.html')

@app.route("/stream")
def stream():
    def eventStream():
        while True:
            print y
            yield "data:{}\n\n".format(y)
    return Response(eventStream(), mimetype="text/event-stream")
