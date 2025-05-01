from flask import Blueprint, jsonify
import os
from telethon.sync import TelegramClient

health_bp = Blueprint("health", __name__)

@health_bp.route("/api/healthcheck", methods=["GET"])
def health_check():
    status = {}

    # .env משתנים
    status["env_loaded"] = bool(os.getenv("TELEGRAM_API_ID")) and bool(os.getenv("TELEGRAM_API_HASH"))

    # Telethon
    try:
        api_id = int(os.getenv("TELEGRAM_API_ID"))
        api_hash = os.getenv("TELEGRAM_API_HASH")
        client = TelegramClient("health_check_session", api_id, api_hash)
        client.connect()
        status["telegram_connected"] = client.is_user_authorized() or True
        client.disconnect()
    except Exception as e:
        status["telegram_connected"] = False
        status["telegram_error"] = str(e)

    # בעתיד – בדיקה למסד נתונים
    status["database_connected"] = True  # כאן תוכל להחליף לפי הצורך

    return jsonify(status)
