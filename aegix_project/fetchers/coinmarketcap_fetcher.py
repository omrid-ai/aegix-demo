# ✅ coinmarketcap_fetcher.py
from flask import Blueprint, jsonify
import requests
import os

coinmarket_bp = Blueprint("coinmarket", __name__, url_prefix="/api/coinmarket")

@coinmarket_bp.route("/top", methods=["GET"])
def get_top_coins():
    api_key = os.getenv("COINMARKETCAP_API_KEY")
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
    headers = {"X-CMC_PRO_API_KEY": api_key}
    params = {"start": "1", "limit": "10", "convert": "USD"}

    try:
        response = requests.get(url, headers=headers, params=params)
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
