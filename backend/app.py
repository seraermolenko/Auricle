from flask import Flask
from services.auricle import auricleService
from services.user import userService
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# Register the blueprints
app.register_blueprint(auricleService, url_prefix='/auricle')
app.register_blueprint(userService, url_prefix='/users')

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == "__main__":
    app.run(debug=True)