from extensions import db

class Student(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    admission_no = db.Column(db.String(50), unique=True)
    class_name = db.Column(db.String(20))
    parent_contact = db.Column(db.String(20))