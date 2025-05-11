
import json
from datetime import datetime

def write_to_archive(post, archive_path="backend/data/avatar_posts.json"):
    try:
        with open(archive_path, "r") as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        data = []
    post['timestamp'] = datetime.now().isoformat()
    data.append(post)
    with open(archive_path, "w") as f:
        json.dump(data, f, indent=2)
