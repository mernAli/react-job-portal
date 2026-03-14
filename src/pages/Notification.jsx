import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Dashboard/Sidebar";
import useNotifications from "../context/useNotifications";
import { getNotifStyle } from "../context/NotificationContext";

const Notification = () => {
  const { theme } = useTheme();
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications();

  const getTimeAgo = (isoString) => {
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Sidebar />

      {/* Mobile Header — UNCHANGED */}
      <div className={`lg:hidden p-4`}>
        <h1 className="text-white text-lg font-semibold">Notifications</h1>
      </div>

      <div className="lg:flex lg:gap-6 lg:px-6">
        <div className="flex-1 lg:space-y-0">

          {/* Desktop Header — UPDATED with mark all read */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Notifications</h1>
              {unreadCount > 0 && (
                <p className={`text-sm ${theme.textMuted} mt-1`}>
                  {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className={`px-4 py-2 text-sm ${theme.primaryText} ${theme.border} border rounded-lg ${theme.hover} font-medium`}
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List — SAME UI, wired to real state */}
          <div className="space-y-3 px-4 lg:px-0 py-4 lg:py-0">
            {notifications.map((notification) => {
              const { icon, colorType } = getNotifStyle(notification.type);
              return (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`${theme.cardBg} rounded-xl ${theme.shadow} overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer ${
                    !notification.read ? `border-l-4 ${
                      colorType === "success" ? "border-green-500" :
                      colorType === "danger" ? "border-red-500" :
                      colorType === "warning" ? "border-yellow-500" :
                      "border-blue-500"
                    }` : ""
                  }`}
                >
                  <div className="p-4 flex items-center gap-4">
                    {/* Icon Avatar — replaces hardcoded img */}
                    <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                      colorType === "success" ? theme.successBg :
                      colorType === "danger" ? theme.dangerBg :
                      colorType === "warning" ? theme.warningBg :
                      theme.infoBg
                    }`}>
                      <span className="text-2xl">{icon}</span>
                    </div>

                    {/* Content — SAME structure */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold ${theme.textPrimary} text-sm lg:text-base`}>
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                        )}
                      </h3>
                      <p className={`text-xs lg:text-sm ${theme.textSecondary} mt-1`}>
                        {notification.message}
                      </p>
                    </div>

                    {/* Time + Remove — SAME structure */}
                    <div className="flex-shrink-0 text-right flex flex-col items-end gap-2">
                      <p className={`text-xs ${theme.textMuted}`}>
                        {getTimeAgo(notification.time)}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                        className={`text-xs ${theme.textMuted} hover:${theme.dangerText}`}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State — UNCHANGED */}
          {notifications.length === 0 && (
            <div className={`${theme.cardBg} p-12 rounded-xl ${theme.shadow} text-center mx-4 lg:mx-0`}>
              <div className={`w-16 h-16 ${theme.infoBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <svg className={`w-8 h-8 ${theme.infoText}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <p className={`text-lg font-semibold ${theme.textPrimary} mb-2`}>No notifications yet</p>
              <p className={theme.textMuted}>When you get notifications, they'll show up here</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation — UNCHANGED */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 ${theme.primary} border-t ${theme.border} z-50`}>
        <div className="flex items-center justify-around py-3 px-2">
          <button className="flex flex-col items-center gap-1 text-white opacity-60">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <span className="text-[10px]">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white opacity-60">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
            <span className="text-[10px]">My Network</span>
          </button>
          <button className="flex flex-col items-center gap-1 relative text-white opacity-60">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" /></svg>
          </button>
          <button className="flex flex-col items-center gap-1 text-white opacity-100">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
            <span className="text-[10px]">Notification</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white opacity-60">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" /></svg>
            <span className="text-[10px]">Jobs</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;