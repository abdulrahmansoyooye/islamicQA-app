import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserConextProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserConextProvider>
      <App />
    </UserConextProvider>
  </React.StrictMode>
);
