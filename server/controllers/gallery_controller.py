from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required
from extensions import db
from models.gallery import Gallery


class GalleryListResource(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        images = Gallery.query.all()

        return [{
            "id": g.id,
            "image_url": g.image_url,
            "caption": g.caption,
            "user_id": g.user_id
        } for g in images]

    def post(self):
        data = request.get_json()

        image = Gallery(
            image_url=data["image_url"],
            caption=data["caption"],
            user_id=data["user_id"]
        )

        db.session.add(image)
        db.session.commit()

        return {"message": "Image uploaded"}, 201


class GalleryResource(Resource):

    def get(self, id):
        image = Gallery.query.get_or_404(id)

        return {
            "id": image.id,
            "image_url": image.image_url,
            "caption": image.caption,
            "user_id": image.user_id
        }

    def delete(self, id):
        image = Gallery.query.get_or_404(id)

        db.session.delete(image)
        db.session.commit()

        return {"message": "Image deleted"}