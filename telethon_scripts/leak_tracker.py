from telethon import TelegramClient
from pymongo import MongoClient

api_id = 'YOUR_API_ID'
api_hash = 'YOUR_API_HASH'
client = TelegramClient('session_name', 21708825,3061289a263e2795312da490a12b456c)

mongo = MongoClient("mongodb://localhost:27017/")
db = mongo['leakdb']
collection = db['matches']

async def main():
    async for message in client.iter_messages("target_channel"):
        if "confidential" in message.text.lower():
            leak = {
                "channel": "target_channel",
                "date": str(message.date),
                "type": "text",
                "details": message.text[:300]
            }
            collection.insert_one(leak)

with client:
    client.loop.run_until_complete(main())

