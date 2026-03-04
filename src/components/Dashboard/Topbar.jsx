import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";
import Modal from "../../ui/Modal";
import { useToast } from "../../ui/toast/useToast";

const Topbar = () => {
  const { user, logout } = useAuth();
  const { theme, currentTheme, changeTheme } = useTheme();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const {showToast} = useToast()

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowLogoutModal(false);
    showToast("You are logged Out", "info")
  };

  // Navigation items based on role
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
          {/* Left: Logo (Mobile only) */}
          <div className="lg:hidden ">
            <h1 className={`text-xl font-bold text-white`}>ZECPATH</h1>
          </div>

          {/* Center: Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-xl ">
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

          {/* Right: Navigation + Profile + Actions */}
          <div className="flex items-center gap-2 lg:gap-6 ml-4">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5 bg-white h-12 rounded-lg ml-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'text-black'
                        : theme.textMuted
                    } hover:${theme.hover}`
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Divider */}
            <div className={`hidden lg:block h-8 w-px ${theme.border}`}></div>

            {/* For Business Dropdown (Desktop) */}
            <button
              className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-black hover:text-white hover:bg-[#898eac] ${theme.secondaryText} text-sm`}
            >
              <span className="text-lg " >🏢</span>
              <span>For Business</span>
              <span className="text-xs">▼</span>
            </button>

            {/* Try Premium Button (Desktop) */}
            <button
              className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-black hover:text-white hover:bg-[#898eac] ${theme.secondaryText} text-sm`}
            >
              <span className="text-lg ">👑</span>
              <span>Try Premium</span>
            </button>

            {/* Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className={`p-2 ${theme.textSecondary} ${theme.hover} rounded-lg transition-colors`}
                title="Change theme"
              >
                {currentTheme === "light" && <span className="text-xl">☀️</span>}
                {currentTheme === "dark" && <span className="text-xl">🌙</span>}
                {currentTheme === "darker" && <span className="text-xl">🌑</span>}
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

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`flex items-center gap-2 p-1 ${theme.hover} rounded-lg`}
              >
                <div className={`w-8 h-8 ${theme.primary} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="hidden lg:block text-xs">{showProfileMenu ? "▲" : "▼"}</span>
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

                  {/* Role-specific menu items */}
                  {user?.role === "candidate" && (
                    <>
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

      {/* Logout Confirmation Modal */}
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