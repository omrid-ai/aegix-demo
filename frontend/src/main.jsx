import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "leaflet/dist/leaflet.css";

import { NewsProvider } from "./context/NewsContext"; // ודא שהנתיב תואם

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NewsProvider>
    <App />
  </NewsProvider>
);
