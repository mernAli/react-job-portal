import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <aside
      className={`w-64 ${theme.sidebarBg} ${theme.border} border-r h-screen fixed left-0 top-0 overflow-y-auto hidden lg:block z-20`}
    >
      {/* Logo Section */}
      <div className={`p-4 bg-blue-950 ${theme.border} border-b`}>
        <h1 className={`text-2xl font-bold ${theme.textSecondary}`}>ZECPATH</h1>
      </div>

      {/* User Profile Card */}
      <div className={`p-6 ${theme.border} border-b`}>
        {/* Profile Picture with Background */}
        <div className="relative mb-4">
          <div className={`h-20 ${theme.primary} rounded-t-lg`}></div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className={`w-20 h-20 ${theme.primary} rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 ${theme.sidebarBg}`}>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-10 text-center">
          <h3 className={`font-semibold ${theme.textPrimary}`}>
            {user?.name || "User"}
          </h3>
          <p className={`text-sm ${theme.textSecondary} mt-1`}>
            {user?.role === "employer" ? "UI/UX Designer" : "Full Stack Developer"}
          </p>
          <p className={`text-xs ${theme.textMuted} mt-1`}>
            Kochi, Ernakulam
          </p>
        </div>

        {/* Divider */}
        <div className={`my-4 border-t ${theme.border}`}></div>

        {/* Quick Links */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-xs ${theme.textMuted}`}>Profile viewers</span>
            <span className={`text-xs font-semibold ${theme.primaryText}`}>48</span>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-xs ${theme.textMuted}`}>Post impressions</span>
            <span className={`text-xs font-semibold ${theme.primaryText}`}>1,234</span>
          </div>
        </div>
      </div>

      {/* Saved Items Section */}
      <div className="p-4">
        <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${theme.hover} transition-colors ${theme.textPrimary}`}>
          <span className="text-lg">🔖</span>
          <span className="text-sm font-medium">Saved</span>
        </button>
        <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${theme.hover} transition-colors ${theme.textPrimary} mt-2`}>
          <span className="text-lg">📧</span>
          <span className="text-sm font-medium">Newsletter</span>
        </button>
      </div>

      {/* Footer Section */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 ${theme.border} border-t ${theme.bg}`}>
        <p className={`text-xs ${theme.textMuted} text-center`}>
          © 2026 ZECPATH
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;