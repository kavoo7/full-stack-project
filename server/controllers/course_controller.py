from flask_restful import Resource
from flask import request
from extensions import db
from models.course import Course


class CourseListResource(Resource):

    def get(self):
        courses = Course.query.all()

        return [{
            "id": c.id,
            "name": c.name,
            "teacher_id": c.teacher_id
        } for c in courses]

    def post(self):
        data = request.get_json()

        course = Course(
            name=data["name"],
            teacher_id=data["teacher_id"]
        )

        db.session.add(course)
        db.session.commit()

        return {"message": "Course created"}, 201


class CourseResource(Resource):

    def get(self, id):
        course = Course.query.get_or_404(id)

        return {
            "id": course.id,
            "name": course.name,
            "teacher_id": course.teacher_id
        }

    def patch(self, id):
        course = Course.query.get_or_404(id)
        data = request.get_json()

        for key, value in data.items():
            setattr(course, key, value)

        db.session.commit()

        return {"message": "Course updated"}

    def delete(self, id):
        course = Course.query.get_or_404(id)

        db.session.delete(course)
        db.session.commit()

        return {"message": "Course deleted"}