from extensions import db

class Course(db.Model):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey("teachers.id"), nullable=True)

    enrollments = db.relationship("Enrollment", backref="course", lazy=True, cascade="all, delete-orphan")