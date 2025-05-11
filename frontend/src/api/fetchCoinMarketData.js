import axios from "axios";

const API_KEY = "62c22173-5c0c-4884-b408-25a1a1cb40cf";
const BASE_URL = "https://pro-api.coinmarketcap.com/v1";

export const fetchTopCoins = async (limit = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/cryptocurrency/listings/latest`, {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
      },
      params: {
        start: "1",
        limit: limit.toString(),
        convert: "USD",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("CoinMarketCap API error:", error);
    return [];
  }
};
