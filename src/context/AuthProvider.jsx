import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { name: "Demo User" } : null;
  });

  const login = (email) => {
    const fakeToken = "jwt-demo-token-123";
    localStorage.setItem("token", fakeToken);
    setUser({ name: "Demo User", email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
