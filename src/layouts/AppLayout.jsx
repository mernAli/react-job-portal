import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Dashboard/Sidebar";
import Topbar from "../components/Dashboard/Topbar";
import BottomNav from "../components/Dashboard/BottomNav";
import { useAuth } from "../context/useAuth";
import { useToast } from "../ui/toast/useToast";
import useSessionTimeout from "../hooks/useSessionTimeout";
import { clearAuth } from "../utils/auth";
import SkipLink from "../components/ui/SkipLink";

const AppLayout = () => {
  const { theme } = useTheme();
  const { logout, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // ── Session timeout handler ──
  const handleSessionTimeout = () => {
    clearAuth();
    logout();
    showToast("Your session has expired. Please log in again.", "warning");
    navigate("/login");
  };

  // ── Inactivity timeout — 30 minutes ──
  useSessionTimeout({
    timeoutMinutes: 30,
    onTimeout: handleSessionTimeout,
    enabled: !!user, // Only active when logged in
  });

  // ── Listen for API-triggered session events ──
  useEffect(() => {
    const handleExpired = () => {
      clearAuth();
      logout();
      showToast("Your session has expired. Please log in again.", "warning");
      navigate("/login");
    };

    const handleForbidden = () => {
      showToast("You do not have permission to perform this action.", "error");
    };

    window.addEventListener("session:expired", handleExpired);
    window.addEventListener("session:forbidden", handleForbidden);

    return () => {
      window.removeEventListener("session:expired", handleExpired);
      window.removeEventListener("session:forbidden", handleForbidden);
    };
  }, [logout, navigate, showToast]);

  return (
    <div className={`flex min-h-screen ${theme.bg}`}>
      {/* Sidebar - Desktop Only */}
      {/* <Sidebar /> */}

      
      {/* 🌟 PLACE SKIP LINK AT THE VERY TOP OF THE APP TREE */}
      <SkipLink />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 mt-16 mb-16 lg:mb-0 overflow-y-auto">
          <Outlet />
        </main>

        {/* Bottom Navigation - Mobile Only */}
        <BottomNav />
      </div>
    </div>
  );
};

export default AppLayout;