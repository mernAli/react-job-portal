import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "./AuthContext";
import {
  loginThunk,
  registerThunk,
  logout as logoutAction,
  restoreSession,
  clearAuthError,
} from "../store/authSlice";

export const AuthProvider = ({ children }) => {
  const dispatch    = useDispatch();
  const user        = useSelector((state) => state.auth.user);
  const token       = useSelector((state) => state.auth.token);
  const authLoading = useSelector((state) => state.auth.authLoading);
  const authError   = useSelector((state) => state.auth.authError);

  // Restore session from localStorage on app load
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  // Login — dispatches thunk, returns { success, role } for components
  const login = async (email, password) => {
    const result = await dispatch(loginThunk({ email, password }));
    if (loginThunk.fulfilled.match(result)) {
      return { success: true, role: result.payload.user.role };
    }
    return { success: false, message: result.payload };
  };

  // Register — dispatches thunk
  const register = async (name, email, password, role) => {
    const result = await dispatch(registerThunk({ name, email, password, role }));
    if (registerThunk.fulfilled.match(result)) {
      return { success: true, role: result.payload.user.role };
    }
    return { success: false, message: result.payload };
  };

  // Logout — dispatches action
  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, authLoading, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
};