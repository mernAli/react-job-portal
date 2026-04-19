import { useDispatch, useSelector } from "react-redux";

// Use these instead of plain useDispatch / useSelector
export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);

// ── Auth selectors ─────────────────────────────────────────
export const selectUser            = (state) => state.auth.user;
export const selectToken           = (state) => state.auth.token;
export const selectAuthLoading     = (state) => state.auth.authLoading;
export const selectAuthError       = (state) => state.auth.authError;
export const selectIsAuthenticated = (state) => !!state.auth.user;
export const selectUserRole        = (state) => state.auth.user?.role;

// ── Profile selectors ──────────────────────────────────────
export const selectProfile         = (state) => state.profile.data;
export const selectUploadingResume = (state) => state.profile.uploadingResume;
export const selectUploadingImage  = (state) => state.profile.uploadingImage;

// ── UI selectors ───────────────────────────────────────────
export const selectGlobalLoading   = (state) => state.ui.globalLoading;
export const selectLoadingMessage  = (state) => state.ui.loadingMessage;
export const selectPageTitle       = (state) => state.ui.pageTitle;