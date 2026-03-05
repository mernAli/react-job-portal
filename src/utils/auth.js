// Check if a token exists and is not empty
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

// Get current user from localStorage
export const getStoredUser = () => {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");
  const role = localStorage.getItem("userRole");

  if (!token || !email || !role) return null;
  return { name, email, role, token };
};

// Clear all auth data
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userRole");
};

// Get role-based redirect path
export const getRoleRedirectPath = (role) => {
  switch (role) {
    case "employer":
      return "/app";
    case "candidate":
      return "/app";
    default:
      return "/app";
  }
};