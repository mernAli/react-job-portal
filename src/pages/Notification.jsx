import {  useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Notification = () => {
  const { theme } = useTheme();
  const [notifications] = useState([
    {
      id: 1,
      type: "job",
      title: "New job posting matches your profile",
      message: "Senior React Developer at Tech Corp",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "application",
      title: "Application status updated",
      message: "Your application for Frontend Engineer has been shortlisted",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "network",
      title: "New connection request",
      message: "John Doe wants to connect with you",
      time: "1 day ago",
      read: true,
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
          Notifications
        </h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Stay updated with your latest activities
        </p>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border ${theme.hover} transition-all ${
              !notification.read ? theme.infoBg : ""
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`w-10 h-10 ${theme.infoBg} rounded-full flex items-center justify-center ${theme.infoText} flex-shrink-0`}
              >
                {notification.type === "job" && "💼"}
                {notification.type === "application" && "📄"}
                {notification.type === "network" && "👥"}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-semibold ${theme.textPrimary} text-sm ${
                    !notification.read ? "font-bold" : ""
                  }`}
                >
                  {notification.title}
                </h3>
                <p className={`text-sm ${theme.textSecondary} mt-1`}>
                  {notification.message}
                </p>
                <p className={`text-xs ${theme.textMuted} mt-2`}>
                  {notification.time}
                </p>
              </div>

              {/* Unread Badge */}
              {!notification.read && (
                <div className={`w-2 h-2 ${theme.primary} rounded-full`}></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div
          className={`${theme.cardBg} p-12 rounded-xl ${theme.border} border text-center`}
        >
          <p className={theme.textMuted}>No notifications yet</p>
        </div>
      )}
    </div>
  );
};

export default Notification;