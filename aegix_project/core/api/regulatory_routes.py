
from flask import Blueprint, jsonify
from core.regulatory_insights_engine import get_regulatory_risks

regulatory_bp = Blueprint('regulatory_api', __name__, url_prefix='/api/regulatory')

@regulatory_bp.route('/risks', methods=['GET'])
def fetch_regulatory_risks():
    risks = get_regulatory_risks()
    return jsonify(risks)
