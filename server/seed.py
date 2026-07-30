from app import app
from extensions import db

from models.user import User
from models.teacher import Teacher
from models.student import Student
from models.course import Course
from models.enrollment import Enrollment
from models.event import Event
from models.gallery import Gallery

from werkzeug.security import generate_password_hash
from datetime import date


with app.app_context():

    # Delete existing data (children first)
    Enrollment.query.delete()
    Course.query.delete()
    Student.query.delete()
    Teacher.query.delete()
    Event.query.delete()
    Gallery.query.delete()
    User.query.delete()

    # =========================
    # Admin User
    # =========================
    admin = User(
        username="admin",
        email="admin@jupiter.ac.ke",
        password_hash=generate_password_hash("admin123"),
        role="admin"
    )

    db.session.add(admin)
    db.session.commit()

    # =========================
    # Teachers
    # =========================
    teachers = [
        Teacher(name="John Mwangi", email="john@jupiter.ac.ke", phone="0712345678"),
        Teacher(name="Grace Wanjiru", email="grace@jupiter.ac.ke", phone="0723456789"),
        Teacher(name="David Otieno", email="david@jupiter.ac.ke", phone="0734567890"),
        Teacher(name="Faith Achieng", email="faith@jupiter.ac.ke", phone="0745678901"),
        Teacher(name="Brian Kiptoo", email="brian@jupiter.ac.ke", phone="0756789012"),
    ]

    db.session.add_all(teachers)
    db.session.commit()

    # =========================
    # Courses
    # =========================
    courses = [
        Course(name="Mathematics", teacher_id=teachers[0].id),
        Course(name="English", teacher_id=teachers[1].id),
        Course(name="Science", teacher_id=teachers[2].id),
        Course(name="Social Studies", teacher_id=teachers[3].id),
        Course(name="Computer Studies", teacher_id=teachers[4].id),
    ]

    db.session.add_all(courses)
    db.session.commit()

    # =========================
    # Students
    # =========================
    students = [
        Student(name="Kevin Maina", admission_no="JP001", class_name="Grade 7", parent_contact="0700111111"),
        Student(name="Mercy Njeri", admission_no="JP002", class_name="Grade 7", parent_contact="0700222222"),
        Student(name="Samuel Otieno", admission_no="JP003", class_name="Grade 8", parent_contact="0700333333"),
        Student(name="Faith Chebet", admission_no="JP004", class_name="Grade 8", parent_contact="0700444444"),
        Student(name="Brian Kimani", admission_no="JP005", class_name="Grade 9", parent_contact="0700555555"),
    ]

    db.session.add_all(students)
    db.session.commit()

    # =========================
    # Enrollments
    # =========================
    enrollments = [
        Enrollment(student_id=students[0].id, course_id=courses[0].id),
        Enrollment(student_id=students[1].id, course_id=courses[1].id),
        Enrollment(student_id=students[2].id, course_id=courses[2].id),
        Enrollment(student_id=students[3].id, course_id=courses[3].id),
        Enrollment(student_id=students[4].id, course_id=courses[4].id),
    ]

    db.session.add_all(enrollments)
    db.session.commit()

    # =========================
    # Events
    # =========================
    events = [
        Event(
            title="Opening Day",
            description="School opens for Term 1",
            date=date(2026, 1, 5),
            user_id=admin.id
        ),
        Event(
            title="Sports Day",
            description="Annual athletics competition",
            date=date(2026, 3, 15),
            user_id=admin.id
        ),
        Event(
            title="Parents Meeting",
            description="Academic progress discussion",
            date=date(2026, 4, 20),
            user_id=admin.id
        ),
    ]

    db.session.add_all(events)
    db.session.commit()

    # =========================
    # Gallery
    # =========================
    gallery = [
        Gallery(
            image_url="https://picsum.photos/400/300?1",
            caption="Students in class",
            user_id=admin.id
        ),
        Gallery(
            image_url="https://picsum.photos/400/300?2",
            caption="Science laboratory",
            user_id=admin.id
        ),
        Gallery(
            image_url="https://picsum.photos/400/300?3",
            caption="Sports Day",
            user_id=admin.id
        ),
    ]

    db.session.add_all(gallery)
    db.session.commit()

    print("✅ Database seeded successfully!")