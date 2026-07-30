from extensions import db

class Gallery(db.Model):
    __tablename__ = "gallery"

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255))
    caption = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))