import { configureStore } from "@reduxjs/toolkit";
import authReducer    from "./authSlice";
import profileReducer from "./profileSlice";
import uiReducer      from "./uiSlice";

const store = configureStore({
  reducer: {
    auth:    authReducer,     // state.auth
    profile: profileReducer,  // state.profile
    ui:      uiReducer,       // state.ui
  },

  // Redux DevTools auto-enabled in dev, disabled in production
  devTools: import.meta.env.DEV,
});

export default store;