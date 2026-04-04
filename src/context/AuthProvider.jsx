import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { loginUser, registerUser } from "../services/authService";
import { clearAuth, setTokenExpiry } from "../utils/auth";

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // true on first load
  const [authError, setAuthError] = useState(null);

  // Restore session on app load
  useEffect(() => {
    const restoreSession = () => {
      try {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("userName");
        const email = localStorage.getItem("userEmail");
        const role = localStorage.getItem("userRole");

        if (token && email && role) {
          setUser({ name, email, role, token });
        }
      } catch (error) {
        // If anything goes wrong, clear corrupted storage
        localStorage.clear();
        console.log('Error occured : ', error);
        
      } finally {
        setAuthLoading(false); // Always stop loading
      }
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    try {
      setAuthLoading(true);
      setAuthError(null);

      const data = await loginUser(email, password);

      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userName", data.user.name);

      setTokenExpiry(24)
      setUser(data.user);
      return { success: true, role: data.user.role };

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
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

      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userRole", data.user.role);

      setTokenExpiry(24);
      setUser(data.user);
      return { success: true, role: data.user.role };

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      setAuthError(message);
      return { success: false, message };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
   clearAuth();
   localStorage.removeItem("tokenExpiry")
    setUser(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, authLoading, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
};