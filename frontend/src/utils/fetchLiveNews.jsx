export const fetchLiveNews = async (query = "cyber", sentiment = "All") => {
  try {
    const res = await fetch("/data/news_mock.json");
    const data = await res.json();

    let filtered = data;

    if (typeof sentiment === "string" && sentiment.toLowerCase() !== "all") {
      filtered = data.filter(
        (item) =>
          typeof item.sentiment === "string" &&
          item.sentiment.toLowerCase() === sentiment.toLowerCase()
      );
    }

    return filtered;
  } catch (err) {
    console.error("❌ Error loading mock news data:", err);
    return [];
  }
};
