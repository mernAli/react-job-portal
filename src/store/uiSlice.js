import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    globalLoading:  false,
    loadingMessage: "",
    pageTitle:      "ZECPATH",
  },

  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading  = action.payload.loading;
      state.loadingMessage = action.payload.message || "";
    },

    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },

    clearGlobalLoading: (state) => {
      state.globalLoading  = false;
      state.loadingMessage = "";
    },
  },
});

export const {
  setGlobalLoading,
  setPageTitle,
  clearGlobalLoading,
} = uiSlice.actions;

export default uiSlice.reducer;