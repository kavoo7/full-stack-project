from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from config import Config
from extensions import db, migrate, jwt

from models import (
    User,
    Teacher,
    Student,
    Course,
    Enrollment,
    Event,
    Gallery,
)

# Import controllers
from controllers.user_controller import (
    RegisterResource,
    LoginResource,
    UserListResource,
    UserResource,
)
from controllers.teacher_controller import TeacherListResource, TeacherResource
from controllers.student_controller import StudentListResource, StudentResource
from controllers.course_controller import CourseListResource, CourseResource
from controllers.enrollment_controller import EnrollmentListResource, EnrollmentResource
from controllers.event_controller import EventListResource, EventResource
from controllers.gallery_controller import GalleryListResource, GalleryResource

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

db.init_app(app)
migrate.init_app(app, db)
jwt.init_app(app)

api = Api(app)

# Home route
@app.route("/")
def home():
    return {"message": "Welcome to Jupiter School Admin API"}

# User routes
api.add_resource(RegisterResource, "/register")
api.add_resource(LoginResource, "/login")
api.add_resource(UserListResource, "/users")
api.add_resource(UserResource, "/users/<int:id>")

# Teacher routes
api.add_resource(TeacherListResource, "/teachers")
api.add_resource(TeacherResource, "/teachers/<int:id>")

# Student routes
api.add_resource(StudentListResource, "/students")
api.add_resource(StudentResource, "/students/<int:id>")

# Course routes
api.add_resource(CourseListResource, "/courses")
api.add_resource(CourseResource, "/courses/<int:id>")

# Enrollment routes
api.add_resource(EnrollmentListResource, "/enrollments")
api.add_resource(EnrollmentResource, "/enrollments/<int:id>")

# Event routes
api.add_resource(EventListResource, "/events")
api.add_resource(EventResource, "/events/<int:id>")

# Gallery routes
api.add_resource(GalleryListResource, "/gallery")
api.add_resource(GalleryResource, "/gallery/<int:id>")

if __name__ == "__main__":
    app.run(debug=True)