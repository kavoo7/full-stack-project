from extensions import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default="admin")

    events = db.relationship("Event", backref="user", lazy=True, cascade="all, delete-orphan")
    gallery = db.relationship("Gallery", backref="user", lazy=True, cascade="all, delete-orphan")