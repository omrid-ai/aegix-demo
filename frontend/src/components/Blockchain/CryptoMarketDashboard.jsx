import React, { useEffect, useState } from "react";
import { 
  Sparkles, 
  TrendingUp, 
  BarChart2, 
  RefreshCw, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Info 
} from "lucide-react";

const CryptoMarketDashboard = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aiInsights, setAiInsights] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'market_cap', direction: 'desc' });
  const [refreshInterval, setRefreshInterval] = useState(null);

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const mockData = generateMockData();
      setCoins(mockData || []);
      setAiInsights(analyzeWithAI(mockData));
      setError(null);
    } catch (err) {
      console.error("CoinMarketCap API error:", err);
      setError("Failed to fetch crypto data.");
    } finally {
      setLoading(false);
    }
  };

  const analyzeWithAI = (data) => {
    const highVolatility = data.filter(coin => Math.abs(coin.quote.USD.percent_change_24h) > 5);
    const biggestGainers = getSortedData(data, 'percent_change_24h', 'desc', 3);
    const biggestLosers = getSortedData(data, 'percent_change_24h', 'asc', 3);
    const highVolume = getSortedData(data, 'volume_24h', 'desc', 3);
    const suspicious = data.filter(coin => coin.quote.USD.volume_24h > 1e9 && Math.abs(coin.quote.USD.percent_change_24h) > 10);

    return [
      {
        title: "Volatility Alert",
        message: `${highVolatility.length} coins show high volatility in the last 24 hours.`,
        icon: <AlertTriangle className="text-yellow-400" size={20} />,
        type: "warning",
      },
      {
        title: "Top Gainers",
        message: `Biggest gainers: ${biggestGainers.map(c => `${c.name} (${c.quote.USD.percent_change_24h.toFixed(2)}%)`).join(", ")}`,
        icon: <TrendingUp className="text-green-400" size={20} />,
        type: "success",
      },
      {
        title: "Top Losers",
        message: `Biggest losers: ${biggestLosers.map(c => `${c.name} (${c.quote.USD.percent_change_24h.toFixed(2)}%)`).join(", ")}`,
        icon: <TrendingUp className="text-red-400" size={20} />,
        type: "danger",
      },
      {
        title: "Trading Volume",
        message: `Highest volume: ${highVolume.map(c => c.name).join(", ")}`,
        icon: <BarChart2 className="text-blue-400" size={20} />,
        type: "info",
      },
      {
        title: "Unusual Activity",
        message: suspicious.length
          ? `Unusual activity detected in: ${suspicious.map(c => c.name).join(", ")}`
          : "No suspicious movements detected at this time.",
        icon: <AlertTriangle className={suspicious.length ? "text-red-400" : "text-green-400"} size={20} />,
        type: suspicious.length ? "danger" : "success",
      },
    ];
  };

  const generateMockData = () => {
    const cryptoNames = [
      { name: "Bitcoin", symbol: "BTC" },
      { name: "Ethereum", symbol: "ETH" },
      { name: "Tether", symbol: "USDT" },
      { name: "BNB", symbol: "BNB" },
      { name: "Solana", symbol: "SOL" },
      { name: "XRP", symbol: "XRP" },
      { name: "Cardano", symbol: "ADA" },
      { name: "Dogecoin", symbol: "DOGE" },
      { name: "Avalanche", symbol: "AVAX" },
      { name: "Polkadot", symbol: "DOT" },
    ];

    return cryptoNames.map((crypto, i) => {
      const price = getDynamicPrice(crypto.symbol);
      return {
        id: i + 1,
        name: crypto.name,
        symbol: crypto.symbol,
        quote: generateQuote(price),
      };
    });
  };

  const getDynamicPrice = (symbol) => {
    if (symbol === "BTC") return 50000 + Math.random() * 5000;
    if (symbol === "ETH") return 3000 + Math.random() * 500;
    if (symbol === "USDT") return 1;
    return 10 + Math.random() * 100;
  };

  const generateQuote = (price) => {
    return {
      USD: {
        price: price,
        volume_24h: (500000000 + Math.random() * 5000000000),
        percent_change_24h: Math.random() > 0.5
          ? Math.random() * 15
          : -Math.random() * 15,
        market_cap: price * (100000000 + Math.random() * 900000000),
        percent_change_7d: Math.random() > 0.5
          ? Math.random() * 30
          : -Math.random() * 30,
        volume_change_24h: Math.random() > 0.5
          ? Math.random() * 20
          : -Math.random() * 20,
      },
    };
  };

  const getSortedData = (data, key, direction, limit) => {
    return [...data].sort((a, b) => {
      const aValue = a.quote.USD[key];
      const bValue = b.quote.USD[key];
      return direction === 'desc' ? bValue - aValue : aValue - bValue;
    }).slice(0, limit);
  };

  useEffect(() => {
    fetchCoins();

    const interval = setInterval(() => {
      fetchCoins();
    }, 60000);
    setRefreshInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSort = (key) => {
    let direction = sortConfig.direction === 'asc' && sortConfig.key === key ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedCoins = [...coins].sort((a, b) => {
    const aValue = sortConfig.key.includes('percent') ? a.quote.USD[sortConfig.key] : a[sortConfig.key];
    const bValue = sortConfig.key.includes('percent') ? b.quote.USD[sortConfig.key] : b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredCoins = sortedCoins.filter(coin => 
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatLargeNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toFixed(2)}`;
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  const handleRefresh = () => {
    fetchCoins();
  };

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
  };

  const CoinDetailModal = ({ coin, onClose }) => {
    if (!coin) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
        <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-lg p-6 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
          
          <div className="flex items-center mb-6">
            <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
              <span className="text-lg font-bold">{coin.symbol.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{coin.name}</h2>
              <p className="text-gray-400">{coin.symbol}</p>
            </div>
            <div className="ml-auto">
              <span className={`text-2xl font-bold ${coin.quote.USD.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${parseFloat(coin.quote.USD.price).toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatCard label="24h Change" value={`${coin.quote.USD.percent_change_24h.toFixed(2)}%`} percentage={coin.quote.USD.percent_change_24h} />
            <StatCard label="7d Change" value={`${coin.quote.USD.percent_change_7d.toFixed(2)}%`} percentage={coin.quote.USD.percent_change_7d} />
            <StatCard label="24h Volume" value={formatLargeNumber(coin.quote.USD.volume_24h)} />
            <StatCard label="Market Cap" value={formatLargeNumber(coin.quote.USD.market_cap)} />
          </div>
          
          <MarketAnalysis coin={coin} formatLargeNumber={formatLargeNumber} />
          
          <div className="flex justify-end">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const StatCard = ({ label, value, percentage }) => (
    <div className={`bg-gray-700 p-4 rounded ${percentage >= 0 ? 'border-green-600' : 'border-red-600'} border`} >
      <p className="text-gray-400 text-sm">{label}</p>
      <p className={`text-lg font-bold ${percentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>{value}</p>
    </div>
  );

  const MarketAnalysis = ({ coin, formatLargeNumber }) => (
    <div className="bg-gray-700 p-4 rounded mb-6">
      <h3 className="text-lg font-semibold text-white mb-2">Market Analysis</h3>
      <p className="text-gray-300">
        {coin.quote.USD.percent_change_24h > 5 
          ? `${coin.name} is showing significant upward movement in the last 24 hours.`
          : coin.quote.USD.percent_change_24h < -5 
          ? `${coin.name} is showing significant downward movement in the last 24 hours.`
          : `${coin.name} is relatively stable in the last 24 hours.`}
        {" "}
        {coin.quote.USD.volume_24h > 1e9 
          ? `Trading volume is very high at ${formatLargeNumber(coin.quote.USD.volume_24h)}.`
          : `Trading volume is moderate at ${formatLargeNumber(coin.quote.USD.volume_24h)}.`
        }
      </p>
    </div>
  );

  const PageSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-800 rounded w-1/4 mb-8"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="h-32 bg-gray-800 rounded"></div>
        <div className="h-32 bg-gray-800 rounded"></div>
        <div className="h-32 bg-gray-800 rounded"></div>
      </div>
      
      <div className="h-12 bg-gray-800 rounded mb-4"></div>
      
      <div className="space-y-4">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="h-16 bg-gray-800 rounded"></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center">
            <Sparkles className="text-yellow-400 mr-2" />
            Crypto Market Dashboard
          </h1>
          
          <div className="flex items-center mt-4 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search coins..."
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <button 
              onClick={handleRefresh}
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 flex items-center justify-center"
              disabled={loading}
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {error ? (
          <div className="bg-red-900 border border-red-700 text-white p-4 rounded-lg mb-6 flex items-center">
            <AlertTriangle className="mr-2" />
            <span>{error}</span>
          </div>
        ) : loading ? (
          <PageSkeleton />
        ) : (
          <>
            {/* AI Insights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {aiInsights.slice(0, 3).map((insight, i) => (
                <div 
                  key={i} 
                  className={`bg-gray-900 border ${getInsightBorderColor(insight.type)} rounded-lg p-4 shadow-lg`}
                >
                  <div className="flex items-center mb-2">
                    {insight.icon}
                    <h3 className="font-semibold ml-2">{insight.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm">{insight.message}</p>
                </div>
              ))}
            </div>

            {/* Additional Insights */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-8">
              <div className="flex items-center mb-2">
                <Info className="text-blue-400 mr-2" size={20} />
                <h3 className="font-semibold">More Insights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiInsights.slice(3).map((insight, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-lg ${getInsightBackgroundColor(insight.type)}`}
                  >
                    <div className="flex items-center">
                      {insight.icon}
                      <p className="text-sm ml-2">{insight.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Crypto Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-800 text-gray-400 text-sm">
                      <th 
                        className="py-3 px-4 text-left cursor-pointer" 
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center">
                          Name {getSortIcon('name')}
                        </div>
                      </th>
                      <th 
                        className="py-3 px-4 text-left cursor-pointer"
                        onClick={() => handleSort('price')}
                      >
                        <div className="flex items-center">
                          Price {getSortIcon('price')}
                        </div>
                      </th>
                      <th 
                        className="py-3 px-4 text-left cursor-pointer"
                        onClick={() => handleSort('percent_change_24h')}
                      >
                        <div className="flex items-center">
                          24h Change {getSortIcon('percent_change_24h')}
                        </div>
                      </th>
                      <th 
                        className="py-3 px-4 text-left cursor-pointer"
                        onClick={() => handleSort('market_cap')}
                      >
                        <div className="flex items-center">
                          Market Cap {getSortIcon('market_cap')}
                        </div>
                      </th>
                      <th 
                        className="py-3 px-4 text-left cursor-pointer"
                        onClick={() => handleSort('volume_24h')}
                      >
                        <div className="flex items-center">
                          Volume (24h) {getSortIcon('volume_24h')}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCoins.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                          No coins found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredCoins.map((coin) => (
                        <tr 
                          key={coin.id} 
                          className="border-b border-gray-800 hover:bg-gray-800 cursor-pointer transition-colors"
                          onClick={() => handleCoinClick(coin)}
                          aria-label={`View details of ${coin.name}`}
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                                <span className="font-bold text-sm">{coin.symbol.charAt(0)}</span>
                              </div>
                              <div>
                                <div className="font-medium">{coin.name}</div>
                                <div className="text-xs text-gray-500">{coin.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-medium">
                            ${parseFloat(coin.quote.USD.price).toFixed(2)}
                          </td>
                          <td className="py-4 px-4">
                            <div className={`flex items-center ${coin.quote.USD.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {coin.quote.USD.percent_change_24h >= 0 ? (
                                <ArrowUpRight size={16} className="mr-1" />
                              ) : (
                                <ArrowDownRight size={16} className="mr-1" />
                              )}
                              {coin.quote.USD.percent_change_24h.toFixed(2)}%
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {formatLargeNumber(coin.quote.USD.market_cap)}
                          </td>
                          <td className="py-4 px-4">
                            {formatLargeNumber(coin.quote.USD.volume_24h)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800 p-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>Data updates automatically every minute. Last updated: {new Date().toLocaleTimeString()}</p>
          <p className="mt-2">Crypto Market Dashboard © {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Coin Detail Modal */}
      {selectedCoin && (
        <CoinDetailModal 
          coin={selectedCoin} 
          onClose={() => setSelectedCoin(null)} 
        />
      )}
    </div>
  );
};

const getInsightBorderColor = (type) => {
  switch(type) {
    case 'success':
      return 'border-green-600';
    case 'danger':
      return 'border-red-600';
    case 'warning':
      return 'border-yellow-600';
    default:
      return 'border-blue-600';
  }
};

const getInsightBackgroundColor = (type) => {
  switch(type) {
    case 'success':
      return 'bg-green-900/30';
    case 'danger':
      return 'bg-red-900/30';
    case 'warning':
      return 'bg-yellow-900/30';
    default:
      return 'bg-blue-900/30';
  }
};

export default CryptoMarketDashboard;