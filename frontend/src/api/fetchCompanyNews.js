
import axios from "axios";

const NEWS_API_KEY = "1d5345c4a40e4930a61bbbd1aa1b9807";

export const fetchCompanyNews = async (companyName) => {
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(companyName)}&sortBy=publishedAt&pageSize=8&language=en&apiKey=${NEWS_API_KEY}`;
  const res = await axios.get(url);
  return res.data.articles || [];
};
