from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required
from extensions import db
from models.student import Student


class StudentListResource(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        students = Student.query.order_by(Student.id.asc()).all()
        return [{
            "id": s.id,
            "name": s.name,
            "admission_no": s.admission_no,
            "class_name": s.class_name,
            "parent_contact": s.parent_contact
        } for s in students], 200

    def post(self):
        data = request.get_json()

        if not data or not data.get("name") or not data.get("admission_no"):
            return {"message": "Student name and admission number are required"}, 400

        if Student.query.filter_by(admission_no=data["admission_no"]).first():
            return {"message": "Admission number already exists"}, 400

        student = Student(
            name=data["name"],
            admission_no=data["admission_no"],
            class_name=data.get("class_name", ""),
            parent_contact=data.get("parent_contact", "")
        )

        db.session.add(student)
        db.session.commit()

        return {"message": "Student added successfully"}, 201


class StudentResource(Resource):
    method_decorators = [jwt_required()]

    def get(self, id):
        student = Student.query.get_or_404(id)
        return {
            "id": student.id,
            "name": student.name,
            "admission_no": student.admission_no,
            "class_name": student.class_name,
            "parent_contact": student.parent_contact
        }, 200

    def patch(self, id):
        student = Student.query.get_or_404(id)
        data = request.get_json()

        if "admission_no" in data and data["admission_no"] != student.admission_no:
            if Student.query.filter_by(admission_no=data["admission_no"]).first():
                return {"message": "Admission number already exists"}, 400

        for key, value in data.items():
            if hasattr(student, key):
                setattr(student, key, value)

        db.session.commit()

        return {"message": "Student updated successfully"}, 200

    def delete(self, id):
        student = Student.query.get_or_404(id)
        db.session.delete(student)
        db.session.commit()

        return {"message": "Student deleted successfully"}, 200