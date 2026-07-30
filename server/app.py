from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

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