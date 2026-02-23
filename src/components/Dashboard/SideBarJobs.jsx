import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const SidebarJobs = ({ onPreferencesClick }) => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const navigate = useNavigate()

   const currentUser = {
    name: "Mike Riz",
    title: "UI/UX Designer",
    company: "Kochi, Ernakulam",
    avatar: "MR",
    followers: 245,
    following: 189,
    pages: 12,
  };

  const handleMyApplication = () => {
    // Implement navigation to My Applications page
    navigate("/app/my-applications");
  }

  const handleSkillAssessment = () => {
    // Implement navigation to Skill Assessment page
    navigate("/app/profile")
  }

  return (
    <aside
      className={`w-64 ${theme.bg} ${theme.border} h-screen fixed left-0 top-0 overflow-y-auto hidden lg:block z-20`}
    >
      {/* Logo Section */}
      <div className={`p-4 bg-blue-950`}>
        <h1 className={`text-2xl font-bold text-white`}>ZECPATH</h1>
      </div>

       {/* Left Sidebar - Profile Card */}
      <div className="w-50 flex-shrink-0 mt-10 ml-10 rounded-lg">
        <div className={`${theme.cardBg}  ${theme.shadow} overflow-hidden rounded-lg`}>
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
          {/* Quick Links */}
            <div className={`border-t ${theme.border}`}>
              <button 
                onClick={onPreferencesClick}
                className={`w-full px-6 py-3 flex items-center gap-3 ${theme.hover} transition-colors text-left`}>
                <svg className={`w-5 h-5 ${theme.primaryText}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span className={`text-sm ${theme.textPrimary}`}>Preferences</span>
              </button>

              <button 
                onClick={handleMyApplication}
                className={`w-full px-6 py-3 flex items-center gap-3 ${theme.hover} transition-colors text-left`}>
                
                <svg className={`w-5 h-5 ${theme.primaryText}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className={`text-sm ${theme.textPrimary}`}>Applied Jobs</span>
              </button>

              <button 
                onClick={handleSkillAssessment}
                className={`w-full px-6 py-3 flex items-center gap-3 ${theme.hover} transition-colors text-left`}>
                <svg className={`w-5 h-5 ${theme.primaryText}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className={`text-sm ${theme.textPrimary}`}>Skill Assessment</span>
              </button>
            </div>
      </div>

      {/* Footer Section */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 ${theme.border} border-t ${theme.bg}`}>
        <p className={`text-xs ${theme.textMuted} text-center`}>
          © 2026 ZECPATH
        </p>
      </div>
    </div>
    </aside>
  );
};

export default SidebarJobs;