import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data:            null,   // full profile object
    uploadingResume: false,
    uploadingImage:  false,
    lastUpdated:     null,
  },

  reducers: {
    setProfile: (state, action) => {
      state.data        = action.payload;
      state.lastUpdated = new Date().toISOString();
    },

    updateProfile: (state, action) => {
      if (state.data) {
        state.data        = { ...state.data, ...action.payload };
        state.lastUpdated = new Date().toISOString();
      }
    },

    setUploadingResume: (state, action) => {
      state.uploadingResume = action.payload;
    },

    setUploadingImage: (state, action) => {
      state.uploadingImage = action.payload;
    },

    clearProfile: (state) => {
      state.data            = null;
      state.uploadingResume = false;
      state.uploadingImage  = false;
      state.lastUpdated     = null;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setUploadingResume,
  setUploadingImage,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;