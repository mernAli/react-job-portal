import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If specific role is required, check it
  if (requiredRole && user.role !== requiredRole) {
    // User has wrong role - redirect to their correct dashboard
    const correctPath = user.role === "employer" ? "/app/employer" : "/app/candidate";
    return <Navigate to={correctPath} replace />;
  }

  return children;
};

export default PrivateRoute;