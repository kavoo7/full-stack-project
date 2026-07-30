from flask_restful import Resource
from flask import request
from extensions import db
from models.enrollment import Enrollment


class EnrollmentListResource(Resource):

    def get(self):
        enrollments = Enrollment.query.all()

        return [{
            "id": e.id,
            "student_id": e.student_id,
            "course_id": e.course_id
        } for e in enrollments]

    def post(self):
        data = request.get_json()

        enrollment = Enrollment(
            student_id=data["student_id"],
            course_id=data["course_id"]
        )

        db.session.add(enrollment)
        db.session.commit()

        return {"message": "Enrollment created"}, 201


class EnrollmentResource(Resource):

    def get(self, id):
        enrollment = Enrollment.query.get_or_404(id)

        return {
            "id": enrollment.id,
            "student_id": enrollment.student_id,
            "course_id": enrollment.course_id
        }

    def delete(self, id):
        enrollment = Enrollment.query.get_or_404(id)

        db.session.delete(enrollment)
        db.session.commit()

        return {"message": "Enrollment deleted"}