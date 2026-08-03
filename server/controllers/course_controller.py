from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required
from extensions import db
from models.course import Course


class CourseListResource(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        courses = Course.query.all()
        return [{
            "id": c.id,
            "name": c.name,
            "teacher_id": c.teacher_id,
            "teacher_name": c.teacher.name if c.teacher else "Unassigned"
        } for c in courses], 200

    def post(self):
        data = request.get_json()
        if not data or "name" not in data:
            return {"message": "Course name is required"}, 400

        course = Course(
            name=data["name"],
            teacher_id=data.get("teacher_id")
        )

        db.session.add(course)
        db.session.commit()

        return {
            "message": "Course created successfully",
            "course": {
                "id": course.id,
                "name": course.name,
                "teacher_id": course.teacher_id,
                "teacher_name": course.teacher.name if course.teacher else "Unassigned"
            }
        }, 201


class CourseResource(Resource):
    method_decorators = [jwt_required()]

    def get(self, id):
        course = Course.query.get_or_404(id)
        return {
            "id": course.id,
            "name": course.name,
            "teacher_id": course.teacher_id,
            "teacher_name": course.teacher.name if course.teacher else "Unassigned"
        }, 200

    def patch(self, id):
        course = Course.query.get_or_404(id)
        data = request.get_json()

        if "name" in data:
            course.name = data["name"]
        if "teacher_id" in data:
            course.teacher_id = data["teacher_id"]

        db.session.commit()

        return {"message": "Course updated successfully"}, 200

    def delete(self, id):
        course = Course.query.get_or_404(id)

        db.session.delete(course)
        db.session.commit()

        return {"message": "Course deleted successfully"}, 200