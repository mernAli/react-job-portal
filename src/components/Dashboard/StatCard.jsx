import { useTheme } from "../../context/ThemeContext";

const StatCard = ({ title, value, icon, trend, trendValue, colorType = "info" }) => {
  const { theme } = useTheme();

  const colorClasses = {
    info: {
      bg: theme.infoBg,
      text: theme.infoText,
    },
    success: {
      bg: theme.successBg,
      text: theme.successText,
    },
    warning: {
      bg: theme.warningBg,
      text: theme.warningText,
    },
    danger: {
      bg: theme.dangerBg,
      text: theme.dangerText,
    },
  };

  return (
    <div
      className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border ${theme.hover} transition-all duration-200`}
    >
      {/* Icon and Title */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className={`text-sm ${theme.textMuted} font-medium`}>{title}</p>
          <h3 className={`text-3xl font-bold ${theme.textPrimary} mt-2`}>
            {value}
          </h3>
        </div>
        <div
          className={`p-3 rounded-lg ${colorClasses[colorType].bg} ${colorClasses[colorType].text}`}
        >
          <span className="text-2xl">{icon}</span>
        </div>
      </div>

      {/* Trend Indicator */}
      {trend && (
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-semibold ${
              trend === "up" ? theme.successText : theme.dangerText
            }`}
          >
            {trend === "up" ? "↑" : "↓"} {trendValue}
          </span>
          <span className={`text-xs ${theme.textMuted}`}>vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;