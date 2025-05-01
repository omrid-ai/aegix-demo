from flask import Blueprint, jsonify
from telethon.sync import TelegramClient
import os
import asyncio
from dotenv import load_dotenv

# טען משתני סביבה
load_dotenv(dotenv_path="aegix_project/.env")

telegram_bp = Blueprint('telegram', __name__)

# משתני סביבה
api_id = int(os.getenv("TELEGRAM_API_ID"))
api_hash = os.getenv("TELEGRAM_API_HASH")
group_url = os.getenv("TELEGRAM_GROUP_URL", "https://t.me/example_group")

client = TelegramClient("aegix_session", api_id, api_hash)

async def fetch_latest_messages(limit=20):
    await client.start()
    entity = await client.get_entity(group_url)
    messages = await client.get_messages(entity, limit=limit)
    return [{
        "sender": str(msg.sender_id),
        "text": msg.message,
        "date": msg.date.isoformat()
    } for msg in messages if msg.message]

@telegram_bp.route("/api/livechat", methods=["GET"])
def get_livechat():
    try:
        messages = asyncio.run(fetch_latest_messages())
        return jsonify(messages)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

print("🔍 Loaded TELEGRAM_API_ID:", os.getenv("TELEGRAM_API_ID"))

