import json
def schedule_post(avatar_id, platform, content, date):
    with open('backend/data/scheduled_activity.json', 'r+') as f:
        data = json.load(f)
        data.append({
            "avatar_id": avatar_id,
            "platform": platform,
            "content": content,
            "date": date
        })
        f.seek(0)
        json.dump(data, f, indent=2)