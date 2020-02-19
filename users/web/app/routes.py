from app import app, db
from app.models import User, UserSchema
from flask import jsonify, request
import os

user_schema = UserSchema()


@app.route("/")
def index():
    return "\n* * *\n* Y *\n* O *\n* L *\n* O *\n* * *\n"

@app.route("/user", methods=['POST'])
def create_user():
    data = request.get_json()
    if data['full_name'] and data['email'] and data['location']:
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user is not None:
            response = {
                'message': 'user already exists'
            }
            return jsonify(response), 403
        new_user = User(
            full_name=data['full_name'], email=data['email'], location=data['location'])
        db.session.add(new_user)
        db.session.commit()

        user = User.query.filter_by(full_name=data['full_name']).first()

        response = {
            'user_id': user.id,
            'message': 'new user registered',

        }
        return jsonify(response), 202
    else:
        response = {
            'status': 'error',
            'message': ['bad request body']
        }
    return jsonify(response), 400

@app.route("/user", methods=['GET'])
def get_users():
    users = User.query.order_by(User.id).all()
    if users is None or users == []:
        response = {
            'message': 'no users in the database'
        }
        return jsonify(response), 202
    
    print(users)
    result = user_schema.dumps(users, many=True)
    print(result)

    response = {
        'data': result,
        'status_code': 202
    }
    return jsonify(response)


@app.route("/user/<user_id>", methods=['GET'])
def get_user_details(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        response = {
            'message': 'user does not exist'
        }
        return jsonify(response), 404

    result = user_schema.dumps(user)
    response = {
        'data': result,
        'status_code': 202
    }
    return jsonify(response)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
