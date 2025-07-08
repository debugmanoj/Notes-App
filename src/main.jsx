import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import {DarkModeProvider} from "./context/DarkModeContext" 
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
         <DarkModeProvider>
        <App />
        </DarkModeProvider>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
