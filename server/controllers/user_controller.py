from flask_restful import Resource
from flask import request
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

from extensions import db
from models.user import User


# -------------------------
# Register
# -------------------------
class RegisterResource(Resource):

    def post(self):
        data = request.get_json()

        if User.query.filter_by(username=data["username"]).first():
            return {"message": "Username already exists"}, 400

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


# -------------------------
# Login
# -------------------------
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


# -------------------------
# Get All Users
# -------------------------
class UserListResource(Resource):

    method_decorators = [jwt_required()]

    def get(self):
        users = User.query.all()

        return [
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
            for user in users
        ], 200


# -------------------------
# Single User
# -------------------------
class UserResource(Resource):

    method_decorators = [jwt_required()]

    def get(self, id):
        user = User.query.get_or_404(id)

        return {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        }, 200

    def patch(self, id):
        user = User.query.get_or_404(id)
        data = request.get_json()

        if "username" in data:
            user.username = data["username"]

        if "email" in data:
            user.email = data["email"]

        if "role" in data:
            user.role = data["role"]

        db.session.commit()

        return {"message": "User updated successfully"}, 200

    def delete(self, id):
        user = User.query.get_or_404(id)

        db.session.delete(user)
        db.session.commit()

        return {"message": "User deleted successfully"}, 200