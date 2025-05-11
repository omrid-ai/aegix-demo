import React, { createContext, useContext, useState } from "react";

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  const addArticles = (newArticles) => {
    setArticles([...newArticles]);
  };

  const getAllArticles = () => {
    return articles;
  };

  return (
    <NewsContext.Provider value={{ articles, addArticles, getAllArticles }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
