import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./tailwind.css";
import { MaterialTailwindControllerProvider } from "./context/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MaterialTailwindControllerProvider>
        <App />
      </MaterialTailwindControllerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
