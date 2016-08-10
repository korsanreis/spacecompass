from flask import Flask, render_template, Response
import time

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/stream")
def stream():
    def eventStream():
        x = 1
        while True:
            x += 1
            print x
            time.sleep(2)
            yield "data:{}\n\n".format(x)
    return Response(eventStream(), mimetype="text/event-stream")
