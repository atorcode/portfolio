// styles
import "./index.scss";

// dependencies
import React from "react";
import ReactDOM from "react-dom/client";

// contexts
import { LoadingProvider } from "./contexts/LoadingContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ScrollProvider } from "./contexts/ScrollContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";

// components
import App from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element");
}
const root = ReactDOM.createRoot(rootElement);

root.render(
  // <React.StrictMode>
  <LoadingProvider>
    <ThemeProvider>
      <ScrollProvider>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </ScrollProvider>
    </ThemeProvider>
  </LoadingProvider>
  // </React.StrictMode>
);
