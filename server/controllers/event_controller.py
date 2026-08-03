from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from extensions import db
from models.event import Event


class EventListResource(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        events = Event.query.all()
        return [{
            "id": e.id,
            "title": e.title,
            "description": e.description,
            "date": str(e.date) if e.date else "",
            "user_id": e.user_id
        } for e in events], 200

    def post(self):
        data = request.get_json()
        if not data or not data.get("title"):
            return {"message": "Event title is required"}, 400

        current_user_id = get_jwt_identity()

        event_date = None
        if data.get("date"):
            try:
                event_date = datetime.strptime(data["date"], "%Y-%m-%d").date()
            except ValueError:
                return {"message": "Invalid date format. Use YYYY-MM-DD"}, 400

        event = Event(
            title=data["title"],
            description=data.get("description", ""),
            date=event_date,
            user_id=data.get("user_id", int(current_user_id) if current_user_id else 1)
        )

        db.session.add(event)
        db.session.commit()

        return {"message": "Event created successfully"}, 201


class EventResource(Resource):
    method_decorators = [jwt_required()]

    def get(self, id):
        event = Event.query.get_or_404(id)
        return {
            "id": event.id,
            "title": event.title,
            "description": event.description,
            "date": str(event.date) if event.date else "",
            "user_id": event.user_id
        }, 200

    def patch(self, id):
        event = Event.query.get_or_404(id)
        data = request.get_json()

        if "title" in data:
            event.title = data["title"]
        if "description" in data:
            event.description = data["description"]
        if "date" in data:
            try:
                event.date = datetime.strptime(data["date"], "%Y-%m-%d").date()
            except ValueError:
                return {"message": "Invalid date format. Use YYYY-MM-DD"}, 400

        db.session.commit()
        return {"message": "Event updated successfully"}, 200

    def delete(self, id):
        event = Event.query.get_or_404(id)

        db.session.delete(event)
        db.session.commit()

        return {"message": "Event deleted successfully"}, 200