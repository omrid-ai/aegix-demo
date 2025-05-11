import React from "react";

const ChartContainer = ({ children }) => {
  return (
    <div style={{ width: "100%", height: "300px", maxWidth: "360px", margin: "0 auto" }}>
      {children}
    </div>
  );
};

export default ChartContainer;
