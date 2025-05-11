import os
from textblob import TextBlob
from dotenv import load_dotenv
import requests

load_dotenv()
API_KEY = os.getenv("NEWS_API_KEY")  # ✅ נשלף מה־.env
NEWS_API_URL = "https://newsapi.org/v2/everything"

def analyze_sentiment(text):
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity
    if polarity > 0.1:
        return "Positive"
    elif polarity < -0.1:
        return "Negative"
    else:
        return "Neutral"

def fetch_news(query="disinformation", language="en", sentiment_filter=None):
    if not API_KEY:
        print("❌ No API key found.")
        return []

    params = {
        "q": query,
        "language": language,
        "sortBy": "publishedAt",
        "pageSize": 20,
        "apiKey": API_KEY
    }
    try:
        response = requests.get(NEWS_API_URL, params=params)
        response.raise_for_status()
    except Exception as e:
        print("❌ Error fetching from NewsAPI:", e)
        return []

    raw_articles = response.json().get("articles", [])
    processed = []

    for article in raw_articles:
        title = article.get("title", "") or ""
        description = article.get("description", "") or ""
        content = title + " " + description
        sentiment = analyze_sentiment(content)
        article["sentiment"] = sentiment
        if not sentiment_filter or sentiment == sentiment_filter:
            processed.append(article)

    return processed
