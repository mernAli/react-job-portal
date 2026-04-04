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
    case "employer":  return "/app";
    case "candidate": return "/app";
    default:          return "/app";
  }
};

// ── NEW: Token expiry helpers ──────────────────────────

// Save token expiry time (call after login)
// Default: 24 hours from now
export const setTokenExpiry = (hoursFromNow = 24) => {
  const expiry = Date.now() + hoursFromNow * 60 * 60 * 1000;
  localStorage.setItem("tokenExpiry", expiry.toString());
};

// Check if token has expired
export const isTokenExpired = () => {
  const expiry = localStorage.getItem("tokenExpiry");
  if (!expiry) return false; // No expiry set — treat as valid
  return Date.now() > parseInt(expiry);
};

// Get time remaining on token in minutes
export const getTokenTimeRemaining = () => {
  const expiry = localStorage.getItem("tokenExpiry");
  if (!expiry) return null;
  const remaining = parseInt(expiry) - Date.now();
  return remaining > 0 ? Math.floor(remaining / 60000) : 0;
};

// Full session validity check — token exists AND not expired
export const isSessionValid = () => {
  return isAuthenticated() && !isTokenExpired();
};