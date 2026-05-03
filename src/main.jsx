import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import { WebSocketProvider } from "./context/WebSocketContext.jsx"; // ← ADD
import { Provider } from "react-redux";
import store from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <NotificationProvider>
        <WebSocketProvider>          {/* ← ADD */}
          <App />
        </WebSocketProvider>         {/* ← ADD */}
      </NotificationProvider>
    </Provider>
  </StrictMode>
);