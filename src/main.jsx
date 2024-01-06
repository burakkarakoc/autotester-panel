import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { AppProvider, MaterialTailwindControllerProvider } from "@/context";
import { AuthProvider } from "@/context";
import "./css/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <MaterialTailwindControllerProvider>
            <AppProvider>
              <App />
            </AppProvider>
          </MaterialTailwindControllerProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
