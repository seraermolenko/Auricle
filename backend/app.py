from flask import Flask
from services.auricle import auricle_service, socketio, init_socketio
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import globals

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

CORS(app)
CORS(app, origins=["http://localhost:5173/"])

app.config['MAX_CONTENT_LENGTH'] = 26836840000000
app.config['MAX_FORM_MEMORY_SIZE'] = 26836840000000

init_socketio(socketio)

app.register_blueprint(auricle_service, url_prefix='/auricle')

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5001)

