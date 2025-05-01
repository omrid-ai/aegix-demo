from flask import Flask, jsonify
from datetime import datetime, timedelta
import random

app = Flask(__name__)

# מילות מפתח ומדינות לדוגמה
keywords = ["deep state", "fake vaccine", "global banking control"]
countries = ["Israel", "USA", "UK", "Germany", "France"]
languages = ["en", "he", "ar", "ru", "fr"]

# ייצור מידע מדומה
def generate_mock_data():
    today = datetime.utcnow()
    data = []
    for keyword in keywords:
        for country in countries:
            for i in range(7):  # 7 ימים אחרונים
                date = (today - timedelta(days=i)).strftime("%Y-%m-%d")
                mentions = random.randint(20, 120)
                data.append({
                    "keyword": keyword,
                    "country": country,
                    "language": random.choice(languages),
                    "date": date,
                    "mentions": mentions
                })
    return data

@app.route("/api/influence-trends", methods=["GET"])
def get_influence_trends():
    data = generate_mock_data()
    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5051, debug=True)
