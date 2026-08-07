from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required
from extensions import db
from models.teacher import Teacher


class TeacherListResource(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        teachers = Teacher.query.order_by(Teacher.id.asc()).all()
        return [{
            "id": teacher.id,
            "name": teacher.name,
            "email": teacher.email,
            "phone": teacher.phone
        } for teacher in teachers], 200

    def post(self):
        data = request.get_json()

        if not data or not data.get("name") or not data.get("email"):
            return {"message": "Teacher name and email are required"}, 400

        if Teacher.query.filter_by(email=data["email"]).first():
            return {"message": "Teacher with this email already exists"}, 400

        teacher = Teacher(
            name=data["name"],
            email=data["email"],
            phone=data.get("phone", "")
        )

        db.session.add(teacher)
        db.session.commit()

        return {"message": "Teacher added successfully"}, 201


class TeacherResource(Resource):
    method_decorators = [jwt_required()]

    def get(self, id):
        teacher = Teacher.query.get_or_404(id)
        return {
            "id": teacher.id,
            "name": teacher.name,
            "email": teacher.email,
            "phone": teacher.phone
        }, 200

    def patch(self, id):
        teacher = Teacher.query.get_or_404(id)
        data = request.get_json()

        if "email" in data and data["email"] != teacher.email:
            if Teacher.query.filter_by(email=data["email"]).first():
                return {"message": "Teacher with this email already exists"}, 400

        for key, value in data.items():
            if hasattr(teacher, key):
                setattr(teacher, key, value)

        db.session.commit()

        return {"message": "Teacher updated successfully"}, 200

    def delete(self, id):
        teacher = Teacher.query.get_or_404(id)

        db.session.delete(teacher)
        db.session.commit()

        return {"message": "Teacher deleted successfully"}, 200