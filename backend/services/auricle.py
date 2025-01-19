from flask import Blueprint, jsonify

# Create a blueprint for product-related routes
auricleService = Blueprint('auricleService', __name__)

@auricleService.route('/', methods=['GET'])
def get_products():
    return "auricle ready!"