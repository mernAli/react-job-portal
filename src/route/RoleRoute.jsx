import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Loader from "../ui/Loader";
import { getDashboardPath } from "../utils/permissions";

// RoleRoute — only allows specific roles, redirects others to their dashboard
const RoleRoute = ({ children, allowedRoles = [] }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role not allowed → redirect to their own dashboard
  if (!allowedRoles.includes(user.role)) {
      
    // ✅ Show 403 page instead of silently redirecting
    return <Navigate to='/unauthorized' replace />;
  }

  return children;
};

export default RoleRoute;