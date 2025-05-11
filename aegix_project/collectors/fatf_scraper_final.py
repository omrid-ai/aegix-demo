from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import json
import os
import time

def fetch_fatf_documents(limit=10):
    options = Options()
    options.add_argument("--remote-debugging-port=9222")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-sandbox")
    options.add_argument("--start-maximized")
    options.add_experimental_option("detach", True)
    # options.add_argument("--headless=new")  ← אל תפעיל מצב headless

    service = Service("chromedriver.exe")
    driver = webdriver.Chrome(service=service, options=options)

    print("🌐 Opening FATF website...")
    driver.get("https://www.fatf-gafi.org/en/publications.html")
    time.sleep(5)

    soup = BeautifulSoup(driver.page_source, "html.parser")
    driver.quit()

    results = []
    articles = soup.select(".publications-list .list-item")

    for item in articles[:limit]:
        title_tag = item.select_one(".title")
        date_tag = item.select_one(".meta .date")
        link_tag = item.select_one("a")
        if title_tag and date_tag and link_tag:
            results.append({
                "title": title_tag.get_text(strip=True),
                "date": date_tag.get_text(strip=True),
                "url": "https://www.fatf-gafi.org" + link_tag["href"]
            })

    return results

if __name__ == "__main__":
    print("🧠 Fetching FATF data...")
    docs = fetch_fatf_documents()
    output_dir = os.path.join("..", "..", "public", "data")
    os.makedirs(output_dir, exist_ok=True)
    with open(os.path.join(output_dir, "fatf_documents.json"), "w", encoding="utf-8") as f:
        json.dump(docs, f, ensure_ascii=False, indent=2)
    print("✅ Data saved to fatf_documents.json")
