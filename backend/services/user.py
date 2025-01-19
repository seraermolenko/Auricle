from flask import Blueprint, jsonify

# Create a blueprint for user-related routes
userService = Blueprint('userService', __name__)

@userService.route('/', methods=['GET'])
def get_users():
    return jsonify({"users": ["Alice", "Bob", "Charlie"]})