import { memo } from "react";
import { useTheme } from "../../context/ThemeContext";

// ✅ Moved OUTSIDE component — created once, never recreated
const COLOR_MAP = {
  info:    { bg: "infoBg",    text: "infoText"    },
  success: { bg: "successBg", text: "successText" },
  warning: { bg: "warningBg", text: "warningText" },
  danger:  { bg: "dangerBg",  text: "dangerText"  },
};

// ✅ memo — only re-renders when props actually change
const StatCard = memo(({ title, value, icon, trend, trendValue, colorType = "info" }) => {
  const { theme } = useTheme();
  const color = COLOR_MAP[colorType] || COLOR_MAP.info;

  return (
    <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border ${theme.hover} transition-all duration-200`}>
      {/* Icon and Title */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className={`text-sm ${theme.textMuted} font-medium`}>{title}</p>
          <h3 className={`text-3xl font-bold ${theme.textPrimary} mt-2`}>{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${theme[color.bg]} ${theme[color.text]}`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>

      {/* Trend Indicator */}
      {trend && (
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${trend === "up" ? theme.successText : theme.dangerText}`}>
            {trend === "up" ? "↑" : "↓"} {trendValue}
          </span>
          <span className={`text-xs ${theme.textMuted}`}>vs last month</span>
        </div>
      )}
    </div>
  );
});

StatCard.displayName = "StatCard";
export default StatCard;