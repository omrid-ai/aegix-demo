from telethon.sync import TelegramClient
import os

api_id = os.getenv("TELEGRAM_API_ID")
api_hash = os.getenv("TELEGRAM_API_HASH")
group_url = 'https://t.me/example_group'  # שים כאן קישור אמיתי

client = TelegramClient('session_name', api_id, api_hash)

async def fetch_latest_messages(limit=20):
    await client.start()
    entity = await client.get_entity(group_url)
    messages = await client.get_messages(entity, limit=limit)
    return [{
        "sender": msg.sender_id,
        "text": msg.message,
        "date": msg.date.isoformat()
    } for msg in messages if msg.message]
