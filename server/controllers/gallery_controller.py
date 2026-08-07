from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.gallery import Gallery


class GalleryListResource(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        images = Gallery.query.order_by(Gallery.id.asc()).all()
        return [{
            "id": g.id,
            "image_url": g.image_url,
            "caption": g.caption,
            "user_id": g.user_id
        } for g in images], 200

    def post(self):
        data = request.get_json()
        if not data or not data.get("image_url"):
            return {"message": "Image URL is required"}, 400

        current_user_id = get_jwt_identity()

        image = Gallery(
            image_url=data["image_url"],
            caption=data.get("caption", ""),
            user_id=data.get("user_id", int(current_user_id) if current_user_id else 1)
        )

        db.session.add(image)
        db.session.commit()

        return {"message": "Image uploaded successfully"}, 201


class GalleryResource(Resource):
    method_decorators = [jwt_required()]

    def get(self, id):
        image = Gallery.query.get_or_404(id)
        return {
            "id": image.id,
            "image_url": image.image_url,
            "caption": image.caption,
            "user_id": image.user_id
        }, 200

    def patch(self, id):
        image = Gallery.query.get_or_404(id)
        data = request.get_json()

        if "image_url" in data:
            image.image_url = data["image_url"]
        if "caption" in data:
            image.caption = data["caption"]

        db.session.commit()

        return {"message": "Image updated successfully"}, 200

    def delete(self, id):
        image = Gallery.query.get_or_404(id)

        db.session.delete(image)
        db.session.commit()

        return {"message": "Image deleted successfully"}, 200