import os
import requests
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

load_dotenv()

twitter_proxy = Blueprint("twitter_proxy", __name__)
TWITTER_BEARER = os.getenv("TWITTER_BEARER_TOKEN")

@twitter_proxy.route("/api/twitter/search")
def twitter_search():
    query = request.args.get("q", "news")
    url = "https://api.twitter.com/2/tweets/search/recent"
    headers = {"Authorization": f"Bearer {TWITTER_BEARER}"}
    params = {
        "query": query,
        "max_results": 10,
        "tweet.fields": "created_at,author_id",
        "expansions": "author_id",
        "user.fields": "username"
    }

    print("📡 Requesting Twitter with Bearer:", TWITTER_BEARER[:20])
    res = requests.get(url, headers=headers, params=params)

    if res.status_code != 200:
        print("❌ Twitter API Error:", res.status_code, res.text)
        return jsonify(res.json()), res.status_code

    return jsonify(res.json())
