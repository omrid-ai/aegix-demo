import React from "react";
import ChatSentimentRadar from "./ChatSentimentRadar";
import MessageClusterView from "./MessageClusterView";
import KeyHighlightsPanel from "./KeyHighlightsPanel";

const ChatSummaryDashboard = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">💬 AI Chat Summary Panel</h2>
      <ChatSentimentRadar />
      <MessageClusterView />
      <KeyHighlightsPanel />
    </div>
  );
};

export default ChatSummaryDashboard;