from flask import Flask
from flask_cors import CORS

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

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

db.init_app(app)
migrate.init_app(app, db)
jwt.init_app(app)

@app.route("/")
def home():
    return {"message": "Welcome to Jupiter School Admin API"}

if __name__ == "__main__":
    app.run(debug=True)