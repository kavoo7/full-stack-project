from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required
from extensions import db
from models.student import Student


class StudentListResource(Resource):
    method_decorators = [jwt_required()]
    def get(self):
        students = Student.query.all()
        return [{
            "id": s.id,
            "name": s.name,
            "admission_no": s.admission_no,
            "class_name": s.class_name,
            "parent_contact": s.parent_contact
        } for s in students], 200

    def post(self):
        data = request.get_json()

        student = Student(
            name=data["name"],
            admission_no=data["admission_no"],
            class_name=data["class_name"],
            parent_contact=data["parent_contact"]
        )

        db.session.add(student)
        db.session.commit()

        return {"message": "Student added successfully"}, 201


class StudentResource(Resource):

    def get(self, id):
        student = Student.query.get_or_404(id)

        return {
            "id": student.id,
            "name": student.name,
            "admission_no": student.admission_no,
            "class_name": student.class_name,
            "parent_contact": student.parent_contact
        }

    def patch(self, id):
        student = Student.query.get_or_404(id)
        data = request.get_json()

        for key, value in data.items():
            setattr(student, key, value)

        db.session.commit()

        return {"message": "Student updated"}

    def delete(self, id):
        student = Student.query.get_or_404(id)
        db.session.delete(student)
        db.session.commit()

        return {"message": "Student deleted"}