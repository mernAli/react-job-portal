import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../services/authService";
import { clearAuth, setTokenExpiry } from "../utils/auth";

// ── Async Thunks ──────────────────────────────────────────

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token",     data.token);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userRole",  data.user.role);
      localStorage.setItem("userName",  data.user.name);
      setTokenExpiry(24);

      return { user: data.user, token: data.token };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed."
      );
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const data = await registerUser(name, email, password, role);

      localStorage.setItem("token",     data.token);
      localStorage.setItem("userName",  data.user.name);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userRole",  data.user.role);
      setTokenExpiry(24);

      return { user: data.user, token: data.token };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed."
      );
    }
  }
);

// ── Slice ─────────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:        null,  // { name, email, role }
    token:       null,
    authLoading: true,  // true until restoreSession runs
    authError:   null,
  },

  reducers: {
    // Runs once on app load — reads localStorage
    restoreSession: (state) => {
      try {
        const token = localStorage.getItem("token");
        const name  = localStorage.getItem("userName");
        const email = localStorage.getItem("userEmail");
        const role  = localStorage.getItem("userRole");

        if (token && email && role) {
          state.user  = { name, email, role };
          state.token = token;
        }
      } catch {
        localStorage.clear();
      } finally {
        state.authLoading = false;
      }
    },

    logout: (state) => {
      clearAuth();
      localStorage.removeItem("tokenExpiry");
      state.user        = null;
      state.token       = null;
      state.authError   = null;
      state.authLoading = false;
    },

    clearAuthError: (state) => {
      state.authError = null;
    },
  },

  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.authLoading = true;
        state.authError   = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user        = action.payload.user;
        state.token       = action.payload.token;
        state.authLoading = false;
        state.authError   = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.authError   = action.payload;
        state.authLoading = false;
      });

    // Register
    builder
      .addCase(registerThunk.pending, (state) => {
        state.authLoading = true;
        state.authError   = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user        = action.payload.user;
        state.token       = action.payload.token;
        state.authLoading = false;
        state.authError   = null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.authError   = action.payload;
        state.authLoading = false;
      });
  },
});

export const { restoreSession, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;