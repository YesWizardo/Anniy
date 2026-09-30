import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.js";
import { RageProvider } from "./rage/RageProvider.js";
import "./styles/index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <RageProvider>
          <App />
        </RageProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
