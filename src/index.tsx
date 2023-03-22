// styles
import "./index.scss";

// dependencies
import React from "react";
import ReactDOM from "react-dom/client";

// contexts
import { ThemeProvider } from "./contexts/ThemeContext";

// components
import App from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element");
}
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);