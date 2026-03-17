import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Dashboard/Sidebar";
import Topbar from "../components/Dashboard/Topbar";
import BottomNav from "../components/Dashboard/BottomNav";

const AppLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex min-h-screen ${theme.bg}`}>
      {/* Sidebar - Desktop Only */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
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