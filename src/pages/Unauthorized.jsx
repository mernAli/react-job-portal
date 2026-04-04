import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/useAuth";
import { getDashboardPath } from "../utils/permissions";

const Unauthorized = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate(getDashboardPath(user?.role));
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.bg} p-4`}>
      <div className={`${theme.cardBg} p-8 rounded-2xl ${theme.border} border shadow-xl max-w-md w-full text-center`}>
        {/* 403 Badge */}
        <div className={`inline-flex items-center justify-center w-20 h-20 ${theme.dangerBg} rounded-full mb-6`}>
          <span className="text-3xl">🔒</span>
        </div>

        <h1 className={`text-3xl font-bold ${theme.textPrimary} mb-2`}>
          403
        </h1>
        <h2 className={`text-xl font-semibold ${theme.textPrimary} mb-3`}>
          Access Denied
        </h2>
        <p className={`${theme.textSecondary} text-sm mb-2`}>
          You don't have permission to view this page.
        </p>
        <p className={`${theme.textMuted} text-xs mb-8`}>
          {user ? (
            <>Logged in as <span className="font-semibold capitalize">{user.role}</span> — {user.email}</>
          ) : (
            "You are not logged in."
          )}
        </p>

        {/* Divider */}
        <div className={`border-t ${theme.border} mb-6`} />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {user ? (
            <button
              onClick={handleGoToDashboard}
              className={`px-6 py-2.5 ${theme.primary} text-white rounded-lg font-medium text-sm ${theme.primaryHover}`}
            >
              Go to My Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className={`px-6 py-2.5 ${theme.primary} text-white rounded-lg font-medium text-sm ${theme.primaryHover}`}
            >
              Log In
            </button>
          )}
          <button
            onClick={() => navigate(-1)}
            className={`px-6 py-2.5 ${theme.border} border ${theme.textPrimary} rounded-lg font-medium text-sm ${theme.hover}`}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;