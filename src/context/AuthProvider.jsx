
// import { useState } from "react";
// import { AuthContext } from "./AuthContext";

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("userRole");
//     const email = localStorage.getItem("userEmail");
//     const name = localStorage.getItem("userName");
    
//     return token ? { name: name || "Demo User", email, role } : null;
//   });

//   const login = (email, role) => {
//     const fakeToken = "jwt-demo-token-123";
//     localStorage.setItem("token", fakeToken);
//     localStorage.setItem("userEmail", email);
//     localStorage.setItem("userRole", role);
//     localStorage.setItem("userName", email.split("@")[0]); // Simple name from email
    
//     setUser({ name: email.split("@")[0], email, role });
//   };

//   const register = (name, email, role) => {
//     const fakeToken = "jwt-demo-token-123";
//     localStorage.setItem("token", fakeToken);
//     localStorage.setItem("userName", name);
//     localStorage.setItem("userEmail", email);
//     localStorage.setItem("userRole", role);
    
//     setUser({ name, email, role });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginUser, registerUser } from "../services/authService";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");

    return token ? { name, email, role } : null;
  });

  // Loading and error states for auth operations
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const login = async (email, password) => {
    try {
      setAuthLoading(true);
      setAuthError(null);

      const data = await loginUser(email, password);

      // Store session
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userName", data.user.name);

      setUser(data.user);
      return { success: true, role: data.user.role };

    } catch (error) {
      const message = error.response?.data?.message || error.message || "Login failed";
      setAuthError(message);
      return { success: false, message };
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (name, email, password, role) => {
    try {
      setAuthLoading(true);
      setAuthError(null);

      const data = await registerUser(name, email, password, role);

      // Store session
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userRole", data.user.role);

      setUser(data.user);
      return { success: true };

    } catch (error) {
      const message = error.response?.data?.message || error.message || "Registration failed";
      setAuthError(message);
      return { success: false, message };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setUser(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, authLoading, authError }}>
      {children}
    </AuthContext.Provider>
  );
};