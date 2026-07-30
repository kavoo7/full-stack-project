from flask_restful import Resource
from flask import request
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

from extensions import db
from models.user import User


class RegisterResource(Resource):
    def post(self):
        data = request.get_json()

        # Check if username already exists
        if User.query.filter_by(username=data["username"]).first():
            return {"message": "Username already exists"}, 400

        # Check if email already exists
        if User.query.filter_by(email=data["email"]).first():
            return {"message": "Email already exists"}, 400

        user = User(
            username=data["username"],
            email=data["email"],
            password_hash=generate_password_hash(data["password"]),
            role=data.get("role", "admin")
        )

        db.session.add(user)
        db.session.commit()

        return {"message": "User registered successfully"}, 201


class LoginResource(Resource):
    def post(self):
        data = request.get_json()

        user = User.query.filter_by(email=data["email"]).first()

        if not user:
            return {"message": "Invalid email or password"}, 401

        if not check_password_hash(user.password_hash, data["password"]):
            return {"message": "Invalid email or password"}, 401

        access_token = create_access_token(identity=str(user.id))

        return {
            "message": "Login successful",
            "access_token": access_token,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }, 200


class UserListResource(Resource):
    def get(self):
        users = User.query.all()

        return [{
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        } for user in users], 200


class UserResource(Resource):
    def get(self, id):
        user = User.query.get_or_404(id)

        return {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        }, 200

    def delete(self, id):
        user = User.query.get_or_404(id)

        db.session.delete(user)
        db.session.commit()

        return {"message": "User deleted successfully"}, 200