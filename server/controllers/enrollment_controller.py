from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required
from extensions import db
from models.enrollment import Enrollment


class EnrollmentListResource(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        enrollments = Enrollment.query.all()
        return [{
            "id": e.id,
            "student_id": e.student_id,
            "student_name": e.student.name if e.student else "Unknown Student",
            "course_id": e.course_id,
            "course_name": e.course.name if e.course else "Unknown Course"
        } for e in enrollments], 200

    def post(self):
        data = request.get_json()
        if not data or "student_id" not in data or "course_id" not in data:
            return {"message": "student_id and course_id are required"}, 400

        # Check duplicate
        existing = Enrollment.query.filter_by(
            student_id=data["student_id"],
            course_id=data["course_id"]
        ).first()
        if existing:
            return {"message": "Student is already enrolled in this course"}, 400

        enrollment = Enrollment(
            student_id=data["student_id"],
            course_id=data["course_id"]
        )

        db.session.add(enrollment)
        db.session.commit()

        return {"message": "Enrollment created successfully"}, 201


class EnrollmentResource(Resource):
    method_decorators = [jwt_required()]

    def get(self, id):
        enrollment = Enrollment.query.get_or_404(id)
        return {
            "id": enrollment.id,
            "student_id": enrollment.student_id,
            "student_name": enrollment.student.name if enrollment.student else "Unknown Student",
            "course_id": enrollment.course_id,
            "course_name": enrollment.course.name if enrollment.course else "Unknown Course"
        }, 200

    def delete(self, id):
        enrollment = Enrollment.query.get_or_404(id)

        db.session.delete(enrollment)
        db.session.commit()

        return {"message": "Enrollment deleted successfully"}, 200