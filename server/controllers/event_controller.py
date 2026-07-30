from flask_restful import Resource
from flask import request
from extensions import db
from models.event import Event


class EventListResource(Resource):

    def get(self):
        events = Event.query.all()

        return [{
            "id": e.id,
            "title": e.title,
            "description": e.description,
            "date": str(e.date),
            "user_id": e.user_id
        } for e in events]

    def post(self):
        data = request.get_json()

        event = Event(
            title=data["title"],
            description=data["description"],
            date=data["date"],
            user_id=data["user_id"]
        )

        db.session.add(event)
        db.session.commit()

        return {"message": "Event created"}, 201


class EventResource(Resource):

    def get(self, id):
        event = Event.query.get_or_404(id)

        return {
            "id": event.id,
            "title": event.title,
            "description": event.description,
            "date": str(event.date),
            "user_id": event.user_id
        }

    def delete(self, id):
        event = Event.query.get_or_404(id)

        db.session.delete(event)
        db.session.commit()

        return {"message": "Event deleted"}