import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { MockWebSocket } from "../services/mockWebSocket";
import { NotificationContext } from "./NotificationContext";
import { NOTIF_TYPES } from "./NotificationContext";

const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const wsRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [activityFeed, setActivityFeed] = useState([]);
  const [interviewUpdates, setInterviewUpdates] = useState([]);

  // Get addNotification from NotificationContext
  const { addNotification } = useContext(NotificationContext);

  const addActivity = useCallback((payload) => {
    setActivityFeed((prev) => [
      {
        id: payload.id || Date.now(),
        actor: payload.actor,
        action: payload.action,
        detail: payload.detail,
        timestamp: payload.timestamp || new Date().toISOString(),
      },
      ...prev.slice(0, 19), // keep last 20 items
    ]);
  }, []);

  const handleMessage = useCallback(
    (raw) => {
      try {
        const { type, payload } = JSON.parse(raw);

        if (type === "notification") {
          // Map notifType string → NOTIF_TYPES key
          const typeMap = {
            status_update: NOTIF_TYPES.STATUS_UPDATE,
            success:       NOTIF_TYPES.SUCCESS,
            info:          NOTIF_TYPES.INFO,
            error:         NOTIF_TYPES.ERROR,
            job_applied:   NOTIF_TYPES.JOB_APPLIED,
          };
          addNotification(
            typeMap[payload.notifType] || NOTIF_TYPES.INFO,
            payload.title,
            payload.message
          );
          // Also add to activity feed
          addActivity({
            ...payload,
            actor: "System",
            action: payload.title,
            detail: payload.message,
          });
        }

        if (type === "interview_status") {
          setInterviewUpdates((prev) => [
            {
              id: payload.id || Date.now(),
              applicationId: payload.applicationId,
              candidateName: payload.candidateName,
              status: payload.status,
              role: payload.role,
              timestamp: payload.timestamp,
            },
            ...prev.slice(0, 49), // keep last 50
          ]);
          // Also push to activity feed
          addActivity({
            ...payload,
            actor: payload.candidateName,
            action: `Status → ${payload.status}`,
            detail: payload.role,
          });
        }

        if (type === "activity") {
          addActivity(payload);
        }
      } catch (err) {
        console.error("[WebSocketContext] Failed to parse message:", err);
      }
    },
    [addNotification, addActivity]
  );

  // ✅ Replace with
useEffect(() => {
  // Prevent StrictMode double-mount from creating two connections
  if (wsRef.current?.readyState === 1) return;

  const ws = new MockWebSocket("wss://mock.zecpath.com/ws");
  wsRef.current = ws;

  ws.onopen = () => {
    setConnected(true);
    console.log("[WebSocket] Connected");
  };

  ws.onmessage = (event) => {
    handleMessage(event.data);
  };

  ws.onclose = () => {
    setConnected(false);
    console.log("[WebSocket] Disconnected");
  };

  ws.onerror = (err) => {
    console.error("[WebSocket] Error:", err);
    setConnected(false);
  };

  return () => {
    ws.close();
  };
}, [handleMessage]);

  // Expose send for future use (e.g. sending read receipts to backend)
  const send = useCallback((data) => {
    if (wsRef.current?.readyState === 1) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  const send = useCallback((data) => {
    if (wsRef.current?.readyState === 1) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return (
    <WebSocketContext.Provider
      value={{ connected, activityFeed, interviewUpdates, send }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};