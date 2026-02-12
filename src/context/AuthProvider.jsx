
import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");
    
    return token ? { name: name || "Demo User", email, role } : null;
  });

  const login = (email, role) => {
    const fakeToken = "jwt-demo-token-123";
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userName", email.split("@")[0]); // Simple name from email
    
    setUser({ name: email.split("@")[0], email, role });
  };

  const register = (name, email, role) => {
    const fakeToken = "jwt-demo-token-123";
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", role);
    
    setUser({ name, email, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};