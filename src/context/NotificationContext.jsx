import { createContext, useState, useCallback } from "react";

export const NotificationContext = createContext();

// Notification types
export const NOTIF_TYPES = {
  JOB_APPLIED: "job_applied",
  STATUS_UPDATE: "status_update",
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info",
};

// Icon and color mapping
export const getNotifStyle = (type) => {
  switch (type) {
    case NOTIF_TYPES.JOB_APPLIED:
      return { icon: "📋", colorType: "success" };
    case NOTIF_TYPES.STATUS_UPDATE:
      return { icon: "🔔", colorType: "info" };
    case NOTIF_TYPES.ERROR:
      return { icon: "❌", colorType: "danger" };
    case NOTIF_TYPES.SUCCESS:
      return { icon: "✅", colorType: "success" };
    case NOTIF_TYPES.INFO:
    default:
      return { icon: "ℹ️", colorType: "info" };
  }
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: NOTIF_TYPES.INFO,
      title: "Welcome to ZECPATH!",
      message: "Your account is set up and ready to use.",
      time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      read: false,
    },
    {
      id: 2,
      type: NOTIF_TYPES.STATUS_UPDATE,
      title: "Application Status Update",
      message: "Your application for Senior React Developer was shortlisted.",
      time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      read: false,
    },
    {
      id: 3,
      type: NOTIF_TYPES.JOB_APPLIED,
      title: "Application Submitted",
      message: "You successfully applied for UI/UX Designer at Creative Agency.",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: true,
    },
  ]);

  // Add a new notification
  const addNotification = useCallback((type, title, message) => {
    const newNotif = {
      id: Date.now(),
      type,
      title,
      message,
      time: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  // Mark single notification as read
  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  // Remove single notification
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        NOTIF_TYPES,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};