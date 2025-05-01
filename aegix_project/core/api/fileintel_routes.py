from flask import Blueprint, jsonify
from datetime import datetime

fileintel_api = Blueprint("fileintel_api", __name__)

DUMMY_FILES = {
    "internal_strategy.pdf": {
        "filename": "internal_strategy.pdf",
        "source": "Telegram",
        "risk_level": "High",
        "keywords": ["confidential", "strategy", "internal"],
        "timestamp": datetime.utcnow().isoformat(),
        "content_snippet": "Strategic planning documents leaked from internal chat.",
        "download_url": "https://aegix.ai/files/internal_strategy.pdf"
    },
    "invoices_2024.zip": {
        "filename": "invoices_2024.zip",
        "source": "Dark Web",
        "risk_level": "Medium",
        "keywords": ["invoices", "leak"],
        "timestamp": datetime.utcnow().isoformat(),
        "content_snippet": "Leaked invoice data possibly tied to known fraud rings.",
        "download_url": "https://aegix.ai/files/invoices_2024.zip"
    }
}

@fileintel_api.route("/api/files/intel", methods=["GET"])
def get_file_intelligence():
    return jsonify(list(DUMMY_FILES.values()))

@fileintel_api.route("/api/files/intel/<filename>", methods=["GET"])
def get_file_details(filename):
    decoded = filename.strip()
    file_info = DUMMY_FILES.get(decoded)
    if not file_info:
        return jsonify({"error": "File not found"}), 404
    return jsonify(file_info)
