import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.bg}`}>
      <div className={`${theme.cardBg} p-8 rounded-xl ${theme.border} border max-w-md text-center`}>
        <div className="text-8xl mb-4">🔍</div>
        <h1 className={`text-4xl font-bold ${theme.textPrimary} mb-2`}>404</h1>
        <h2 className={`text-xl font-semibold ${theme.textPrimary} mb-4`}>
          Page Not Found
        </h2>
        <p className={`${theme.textSecondary} mb-6`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className={`px-6 py-3 ${theme.border} border rounded-lg ${theme.hover} font-medium`}
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className={`px-6 py-3 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium`}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;