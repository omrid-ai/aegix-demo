# ✅ קובץ: core/api/search_query_api.py

from flask import Blueprint, request, jsonify
from aegix_project.analytics.data_enrichment_and_analysis import analyze_search_results
from datetime import datetime

search_query_api = Blueprint("search_query_api", __name__)

@search_query_api.route("/api/search-query", methods=["POST"])
def handle_search_query():
    data = request.get_json()

    keywords = data.get("keywords", [])
    sources = data.get("sources", [])
    time_range = data.get("time_range", "7d")

    if not keywords or not sources:
        return jsonify({"error": "Missing keywords or sources"}), 400

    try:
        # שלב 1: איסוף נתונים מהמקורות לפי מילות מפתח
        raw_results = search_osint_sources(keywords, sources, time_range)

        # שלב 2: אנליזה ותיוגים (sentiment, entities, risk score)
        enriched_results, summary = analyze_search_results(raw_results)

        return jsonify({
            "results": enriched_results,
            "summary": summary,
            "timestamp": datetime.utcnow().isoformat()
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
