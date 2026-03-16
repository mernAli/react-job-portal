import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/useAuth";

const BottomNav = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: "/app/home", label: "Home", icon: "🏠︎" },
    { path: "/app/network", label: "Network", icon: "𐦂𖨆𐀪𖠋" },
    { path: "/app/notifications", label: "Alerts", icon: "🕭" },
    { path: "/app/jobs", label: "Jobs", icon: "🜲" },
  ];

  const pricingPath =
    user?.role === "employer"
      ? "/app/employer-pricing"
      : "/app/candidate-pricing";

  return (
    <nav
      className={`lg:hidden fixed bottom-0 left-0 right-0 ${theme.cardBg} ${theme.border} border-t z-50 safe-area-inset-bottom`}
    >
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                isActive ? theme.primaryText : theme.textMuted
              }`
            }
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}

        {/* 👑 Premium — role-aware */}
        <button
          onClick={() => navigate(pricingPath)}
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${theme.textMuted}`}
        >
          <span className="text-2xl">👑</span>
          <span className="text-xs font-medium">Premium</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;