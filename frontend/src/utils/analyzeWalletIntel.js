
// utils/analyzeWalletIntel.js

export function analyzeWalletTransactions(transactions) {
  const stats = {
    totalTx: transactions.length,
    totalValueETH: 0,
    averageValueETH: 0,
    failedTx: 0,
    selfTransfers: 0,
    contractsCalled: 0,
    byFunction: {},
    dailyVolume: {},
    topRecipients: {},
    topSenders: {}
  };

  transactions.forEach((tx) => {
    const valueETH = parseFloat(tx.value) / 1e18;
    stats.totalValueETH += valueETH;

    // Count failed
    if (tx.isError === "1") stats.failedTx++;

    // Self transfer
    if (tx.from === tx.to) stats.selfTransfers++;

    // Contract
    if (tx.contractAddress && tx.contractAddress !== "0x0000000000000000000000000000000000000000") {
      stats.contractsCalled++;
    }

    // Function
    const func = tx.functionName?.split("(")[0] || "unknown";
    stats.byFunction[func] = (stats.byFunction[func] || 0) + 1;

    // Daily volume
    const date = new Date(parseInt(tx.timeStamp) * 1000).toISOString().split("T")[0];
    stats.dailyVolume[date] = (stats.dailyVolume[date] || 0) + valueETH;

    // Top addresses
    if (tx.to) {
      stats.topRecipients[tx.to] = (stats.topRecipients[tx.to] || 0) + valueETH;
    }
    if (tx.from) {
      stats.topSenders[tx.from] = (stats.topSenders[tx.from] || 0) + valueETH;
    }
  });

  stats.averageValueETH = stats.totalValueETH / (stats.totalTx || 1);

  // Sort top senders/recipients
  stats.topRecipients = Object.entries(stats.topRecipients)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  stats.topSenders = Object.entries(stats.topSenders)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return stats;
}
