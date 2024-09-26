import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App";
import { AttractionProvider } from "./context/AttractionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AttractionProvider>
      <App />
    </AttractionProvider>
  </React.StrictMode>
);
