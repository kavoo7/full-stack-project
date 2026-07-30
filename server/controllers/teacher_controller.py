from flask_restful import Resource
from flask import request
from extensions import db
from models.teacher import Teacher


class TeacherListResource(Resource):

    def get(self):
        teachers = Teacher.query.all()

        return [
            {
                "id": teacher.id,
                "name": teacher.name,
                "email": teacher.email,
                "phone": teacher.phone
            }
            for teacher in teachers
        ], 200


    def post(self):
        data = request.get_json()

        teacher = Teacher(
            name=data["name"],
            email=data["email"],
            phone=data["phone"]
        )

        db.session.add(teacher)
        db.session.commit()

        return {"message": "Teacher added successfully"}, 201


class TeacherResource(Resource):

    def get(self, id):
        teacher = Teacher.query.get_or_404(id)

        return {
            "id": teacher.id,
            "name": teacher.name,
            "email": teacher.email,
            "phone": teacher.phone
        }


    def patch(self, id):
        teacher = Teacher.query.get_or_404(id)
        data = request.get_json()

        if "name" in data:
            teacher.name = data["name"]

        if "email" in data:
            teacher.email = data["email"]

        if "phone" in data:
            teacher.phone = data["phone"]

        db.session.commit()

        return {"message": "Teacher updated successfully"}


    def delete(self, id):
        teacher = Teacher.query.get_or_404(id)

        db.session.delete(teacher)
        db.session.commit()

        return {"message": "Teacher deleted successfully"}