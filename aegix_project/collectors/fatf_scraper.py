import requests
from bs4 import BeautifulSoup
import json
import os

BASE_URL = "https://www.fatf-gafi.org/en/publications.html"

def fetch_fatf_documents(limit=10):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                      "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.google.com/"
    }

    response = requests.get(BASE_URL, headers=headers)
    if response.status_code != 200:
        raise Exception(f"Error fetching page: {response.status_code}")

    soup = BeautifulSoup(response.text, 'html.parser')
    results = []

    articles = soup.select(".publications-list .list-item")

    for item in articles[:limit]:
        title_tag = item.select_one(".title")
        date_tag = item.select_one(".meta .date")
        link_tag = item.select_one("a")

        if title_tag and date_tag and link_tag:
            title = title_tag.get_text(strip=True)
            date = date_tag.get_text(strip=True)
            link = "https://www.fatf-gafi.org" + link_tag["href"]

            results.append({
                "title": title,
                "date": date,
                "url": link
            })

    return results

def save_to_json(data, output_path):
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    try:
        print("🔎 Fetching FATF publications...")
        docs = fetch_fatf_documents()
        output_dir = os.path.join("..", "..", "public", "data")
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, "fatf_documents.json")
        save_to_json(docs, output_path)
        print(f"✅ Saved {len(docs)} documents to {output_path}")
    except Exception as e:
        print(f"❌ Error: {e}")
