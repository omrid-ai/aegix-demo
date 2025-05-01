# 📁 File: aegix_project/core/api/default_query_api.py

from flask import Blueprint, request, jsonify
from aegix_project.core.config.category_query_map import get_default_query

default_query_api = Blueprint("default_query_api", __name__)

@default_query_api.route("/api/default-query", methods=["GET"])
def default_query():
    sector = request.args.get("sector")
    category = request.args.get("category")
    
    if not sector or not category:
        return jsonify({"error": "Missing sector or category"}), 400

    query = get_default_query(sector, category)
    return jsonify(query)
