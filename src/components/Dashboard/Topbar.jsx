import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";
import Modal from "../../ui/Modal";
import { useToast } from "../../ui/toast/useToast";
import useNotifications from "../../context/useNotifications";
import { getNotifStyle } from "../../context/NotificationContext";

const Topbar = () => {
  const { user, logout } = useAuth();
  const { theme, currentTheme, changeTheme } = useTheme();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const notifRef = useRef(null);
  const { showToast } = useToast();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotifications();

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowLogoutModal(false);
    showToast("You are logged Out", "info");
  };

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

  const navItems = [
    { path: "/app/home", label: "Home", icon: "🏠︎" },
    { path: "/app/network", label: "My Network", icon: "𐦂𖨆𐀪𖠋" },
    { path: "/app/notifications", label: "Notification", icon: "🕭" },
    { path: "/app/jobs", label: "Jobs", icon: "🜲" },
  ];

  return (
    <>
      <header
        className={`h-16 bg-blue-950 ${theme.border} border-b fixed top-0 right-0 left-0 lg:left-64 z-10`}
      >
        <div className="h-full px-4 lg:px-6 flex items-center justify-between">
          {/* Left: Logo (Mobile only) — UNCHANGED */}
          <div className="lg:hidden">
            <h1 className={`text-xl font-bold text-white`}>ZECPATH</h1>
          </div>

          {/* Center: Search Bar (Desktop) — UNCHANGED */}
          <div className="hidden lg:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className={`w-full px-4 py-2 pl-10 bg-white ${theme.border} border rounded-lg ${theme.focus} text-gray-700 text-sm outline-none`}
              />
              <svg
                className={`w-5 h-5 ${theme.textMuted} absolute left-3 top-2.5`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Right: Navigation + Actions — UNCHANGED except bell added */}
          <div className="flex items-center gap-2 lg:gap-6 ml-4">
            {/* Desktop Navigation — UNCHANGED */}
            <nav className="hidden lg:flex items-center gap-0.5 bg-white h-12 rounded-lg ml-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg transition-colors ${
                      isActive ? "text-black" : theme.textMuted
                    } hover:${theme.hover}`
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Divider — UNCHANGED */}
            <div className={`hidden lg:block h-8 w-px ${theme.border}`}></div>

            {/* For Business — UNCHANGED */}
            <button
              className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-black hover:text-white hover:bg-[#898eac] ${theme.secondaryText} text-sm`}
            >
              <span className="text-lg">🏢</span>
              <span>For Business</span>
              <span className="text-xs">▼</span>
            </button>

            {/* Try Premium — UNCHANGED */}
            <button
              onClick={() => {
                setShowProfileMenu(false);
                navigate("/app/candidate-pricing");
              }}
              className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-black hover:text-white hover:bg-[#898eac] ${theme.secondaryText} text-sm`}
            >
              <span className="text-lg">👑</span>
              <span>Try Premium</span>
            </button>

            {/* 🔔 Notification Bell — NEW */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  setShowProfileMenu(false);
                  setShowThemeMenu(false);
                }}
                className={`relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors`}
                title="Notifications"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                {/* Unread badge */}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifDropdown && (
                <div
                  className={`absolute mt-3 sm:mt-2 w-screen max-w-sm sm:w-80 ${theme.cardBg} ${theme.border} border rounded-xl ${theme.shadowMd} overflow-hidden`}
                  style={{ maxWidth: "calc(100vw - 5rem)", right: -110 }}
                >
                  {/* Dropdown Header */}
                  <div
                    className={`px-4 py-3 flex items-center justify-between border-b ${theme.border}`}
                  >
                    <h3 className={`font-semibold ${theme.textPrimary}`}>
                      Notifications
                      {unreadCount > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className={`text-xs ${theme.primaryText} hover:opacity-70`}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {/* Notification List */}
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="text-3xl mb-2">🔔</div>
                        <p className={`text-sm ${theme.textMuted}`}>
                          No notifications yet
                        </p>
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((notif) => {
                        const { icon, colorType } = getNotifStyle(notif.type);
                        return (
                          <div
                            key={notif.id}
                            onClick={() => markAsRead(notif.id)}
                            className={`flex items-start gap-3 px-4 py-3 cursor-pointer border-b ${theme.border} transition-colors ${theme.hover} ${
                              !notif.read ? `${theme.infoBg}` : ""
                            }`}
                          >
                            {/* Icon */}
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                                colorType === "success"
                                  ? theme.successBg
                                  : colorType === "danger"
                                    ? theme.dangerBg
                                    : colorType === "warning"
                                      ? theme.warningBg
                                      : theme.infoBg
                              }`}
                            >
                              <span className="text-sm">{icon}</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p
                                  className={`text-sm font-medium ${theme.textPrimary} truncate`}
                                >
                                  {notif.title}
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeNotification(notif.id);
                                  }}
                                  className={`text-xs ${theme.textMuted} hover:opacity-70 flex-shrink-0`}
                                >
                                  ×
                                </button>
                              </div>
                              <p
                                className={`text-xs ${theme.textSecondary} mt-0.5 line-clamp-2`}
                              >
                                {notif.message}
                              </p>
                              <p className={`text-xs ${theme.textMuted} mt-1`}>
                                {getTimeAgo(notif.time)}
                              </p>
                            </div>

                            {/* Unread dot */}
                            {!notif.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Dropdown Footer */}
                  <button
                    onClick={() => {
                      setShowNotifDropdown(false);
                      navigate("/app/notifications");
                    }}
                    className={`w-full py-3 text-center text-sm ${theme.primaryText} font-medium border-t ${theme.border} ${theme.hover}`}
                  >
                    View all notifications →
                  </button>
                </div>
              )}
            </div>

            {/* Theme Switcher — UNCHANGED */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowThemeMenu(!showThemeMenu);
                  setShowNotifDropdown(false);
                }}
                className={`p-2 ${theme.textSecondary} ${theme.hover} rounded-lg transition-colors`}
                title="Change theme"
              >
                {currentTheme === "light" && (
                  <span className="text-xl">☀️</span>
                )}
                {currentTheme === "dark" && <span className="text-xl">🌙</span>}
                {currentTheme === "darker" && (
                  <span className="text-xl">🌑</span>
                )}
              </button>
              {showThemeMenu && (
                <div
                  className={`absolute right-0 mt-2 w-40 ${theme.cardBg} ${theme.border} border rounded-lg ${theme.shadowMd} py-2`}
                >
                  <button
                    onClick={() => {
                      changeTheme("light");
                      setShowThemeMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${theme.textPrimary} ${theme.hover} flex items-center gap-2`}
                  >
                    ☀️ Light
                  </button>
                  <button
                    onClick={() => {
                      changeTheme("dark");
                      setShowThemeMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${theme.textPrimary} ${theme.hover} flex items-center gap-2`}
                  >
                    🌙 Dark
                  </button>
                  <button
                    onClick={() => {
                      changeTheme("darker");
                      setShowThemeMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${theme.textPrimary} ${theme.hover} flex items-center gap-2`}
                  >
                    🌑 Darker
                  </button>
                </div>
              )}
            </div>

            {/* Profile Dropdown — UNCHANGED */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifDropdown(false);
                }}
                className={`flex items-center gap-2 p-1 ${theme.hover} rounded-lg`}
              >
                <div
                  className={`w-8 h-8 ${theme.primary} rounded-full flex items-center justify-center text-white font-semibold text-sm`}
                >
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="hidden lg:block text-xs">
                  {showProfileMenu ? "▲" : "▼"}
                </span>
              </button>
              {showProfileMenu && (
                <div
                  className={`absolute right-0 mt-2 w-48 ${theme.cardBg} ${theme.border} border rounded-lg ${theme.shadowMd} py-2`}
                >
                  <div className={`px-4 py-2 ${theme.border} border-b`}>
                    <p className={`text-sm font-semibold ${theme.textPrimary}`}>
                      {user?.name}
                    </p>
                    <p className={`text-xs ${theme.textMuted} capitalize`}>
                      {user?.role}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/app/profile");
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${theme.textPrimary} ${theme.hover}`}
                  >
                    👤 View Profile
                  </button>
                  {user?.role === "candidate" && (
                    <>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate("/app/candidate-dashboard");
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${theme.textPrimary} ${theme.hover}`}
                      >
                        📊 My Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate("/app/browse-jobs");
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${theme.textPrimary} ${theme.hover}`}
                      >
                        🔍 Browse Jobs
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate("/app/my-applications");
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${theme.textPrimary} ${theme.hover}`}
                      >
                        📋 My Applications
                      </button>
                    </>
                  )}
                  {user?.role === "employer" && (
                    <>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate("/app/employer-dashboard");
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${theme.textPrimary} ${theme.hover}`}
                      >
                        📊 My Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate("/app/post-job");
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${theme.textPrimary} ${theme.hover}`}
                      >
                        ➕ Post a Job
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate("/app/my-jobs");
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${theme.textPrimary} ${theme.hover}`}
                      >
                        💼 My Jobs
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate("/app/applications");
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${theme.textPrimary} ${theme.hover}`}
                      >
                        📄 Applications
                      </button>
                    </>
                  )}
                  <div className={`border-t ${theme.border} my-2`}></div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setShowLogoutModal(true);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${theme.dangerText} ${theme.hover}`}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Logout Modal — UNCHANGED */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Logout"
      >
        <p className={`${theme.textSecondary} mb-6`}>
          Are you sure you want to logout?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowLogoutModal(false)}
            className={`px-4 py-2 ${theme.border} border rounded-lg ${theme.hover} text-sm text-white`}
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className={`px-4 py-2 ${theme.danger} text-white rounded-lg hover:bg-red-600`}
          >
            Logout
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Topbar;
