import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Loader from "../ui/Loader";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, authLoading } = useAuth();

  // Still checking localStorage — show loader, not login page
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  // Not logged in — redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role — redirect to correct dashboard
  if (requiredRole && user.role !== requiredRole) {
    const correctPath =
      user.role === "employer" ? "/app" : "/app";
    return <Navigate to={correctPath} replace />;
  }

  return children;
};

export default PrivateRoute;