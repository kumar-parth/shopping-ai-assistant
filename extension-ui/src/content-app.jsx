// content-app.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const mountApp = () => {
  const container = document.getElementById("shopping-helper-root");
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
  } else {
    console.error("❌ Could not find root to mount App");
  }
};

mountApp();
