
import os
from flask import Blueprint, request, jsonify
from datetime import datetime
from werkzeug.utils import secure_filename

content_removal_api = Blueprint("content_removal", __name__)

UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

DATA_FILE = os.path.join(os.getcwd(), "public", "data", "mock_content_removal_data.json")

@content_removal_api.route("/api/content-removal/cases", methods=["GET"])
def get_removal_cases():
    import json
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    return jsonify(data)

@content_removal_api.route("/api/content-removal/submit", methods=["POST"])
def submit_removal_request():
    try:
        platform = request.form.get("platform")
        link = request.form.get("link")
        reason = request.form.get("reason")
        description = request.form.get("description")
        priority = request.form.get("priority")
        severity = request.form.get("severity")
        uploaded_file = request.files.get("file")

        filename = None
        if uploaded_file:
            filename = secure_filename(uploaded_file.filename)
            uploaded_file.save(os.path.join(UPLOAD_FOLDER, filename))

        import json
        new_case = {
            "date": datetime.utcnow().strftime("%b %d, %Y"),
            "platform": platform,
            "description": description,
            "priority": priority,
            "status": "Pending",
            "link": link,
            "severity": severity,
            "file": filename,
        }

        with open(DATA_FILE, "r+", encoding="utf-8") as f:
            data = json.load(f)
            data.append(new_case)
            f.seek(0)
            json.dump(data, f, indent=2)
            f.truncate()

        return jsonify({"message": "Case submitted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
