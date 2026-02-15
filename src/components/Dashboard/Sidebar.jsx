import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

   const currentUser = {
    name: "Mike Riz",
    title: "UI/UX Designer",
    company: "Kochi, Ernakulam",
    avatar: "MR",
    followers: 245,
    following: 189,
    pages: 12,
  };

  return (
    <aside
      className={`w-64 ${theme.bg} ${theme.border} h-screen fixed left-0 top-0 overflow-y-auto hidden lg:block z-20`}
    >
      {/* Logo Section */}
      <div className={`p-4 bg-blue-950`}>
        <h1 className={`text-2xl font-bold text-white`}>ZECPATH</h1>
      </div>

       {/* Left Sidebar - Profile Card */}
      <div className="w-64 flex-shrink-0 mt-10 ml-10">
        <div className={`${theme.cardBg}  ${theme.shadow} overflow-hidden`}>
          {/* Profile Header */}
          <div className={`bg-blue-950 h-20`}></div>
          
          {/* Avatar */}
          <div className="relative px-6 -mt-10 pb-4">
            <div className="w-20 h-20 rounded-full bg-white border-4 border-white flex items-center justify-center overflow-hidden">
              <div className={`w-full h-full ${theme.infoBg} flex items-center justify-center text-2xl font-bold ${theme.primaryText}`}>
                👤
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-4">
            <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>
              {user?.name || "Guest User"}
            </h2>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>
              {user?.role === "employer" ? "Hiring Manager" : "Developer"}
            </p>
            <p className={`text-xs ${theme.textMuted} mt-1`}>
              {currentUser.company}
            </p>
          </div>

          {/* Stats */}
          <div className={`border-t ${theme.border}`}>
            <button className={`w-full px-6 py-3 flex items-center gap-3 ${theme.hover} transition-colors`}>
              <svg className={`w-5 h-5 ${theme.textSecondary}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <div className="flex-1 text-left">
                <p className={`text-xs ${theme.textMuted}`}>Followers</p>
                <p className={`text-sm font-semibold ${theme.textPrimary}`}>{currentUser.followers}</p>
              </div>
            </button>

            <button className={`w-full px-6 py-3 flex items-center gap-3 ${theme.hover} transition-colors`}>
              <svg className={`w-5 h-5 ${theme.textSecondary}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              <div className="flex-1 text-left">
                <p className={`text-xs ${theme.textMuted}`}>Following</p>
                <p className={`text-sm font-semibold ${theme.textPrimary}`}>{currentUser.following}</p>
              </div>
            </button>

            <button className={`w-full px-6 py-3 flex items-center gap-3 ${theme.hover} transition-colors`}>
              <svg className={`w-5 h-5 ${theme.textSecondary}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
              <div className="flex-1 text-left">
                <p className={`text-xs ${theme.textMuted}`}>Pages</p>
                <p className={`text-sm font-semibold ${theme.textPrimary}`}>{currentUser.pages}</p>
              </div>
            </button>
          </div>
        </div>
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