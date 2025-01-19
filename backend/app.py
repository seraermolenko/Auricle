from flask import Flask
from services.auricle import auricleService
from services.user import userService

app = Flask(__name__)

# Register the blueprints
app.register_blueprint(auricleService, url_prefix='/auricle')
app.register_blueprint(userService, url_prefix='/users')

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == "__main__":
    app.run(debug=True)