from flask import Blueprint, jsonify
from datetime import datetime

broadcast_api = Blueprint("broadcast_api", __name__)

@broadcast_api.route("/api/broadcast/manipulation", methods=["GET"])
def get_broadcast_manipulation():
    dummy_data = [
        {
            "headline": "Minister Accused of Treason in Exclusive Report",
            "channel": "GlobalNews24",
            "type": "Framing",
            "target": "Minister X",
            "timestamp": datetime.utcnow().isoformat()
        },
        {
            "headline": "Opposition Blamed for Economic Decline",
            "channel": "StateMedia",
            "type": "Smearing",
            "target": "Opposition Leader",
            "timestamp": datetime.utcnow().isoformat()
        }
    ]
    return jsonify(dummy_data)
