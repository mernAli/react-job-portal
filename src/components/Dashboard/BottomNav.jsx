import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const BottomNav = () => {
  const { theme } = useTheme();

  const navItems = [
    { path: "/app/home", label: "Home", icon: "🏠︎" },
    { path: "/app/network", label: "Network", icon: "𐦂𖨆𐀪𖠋" },
    { path: "/app/notifications", label: "Notifications", icon: "🕭" },
    { path: "/app/jobs", label: "Jobs", icon: "🜲" },
  ];

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
      </div>
    </nav>
  );
};

export default BottomNav;