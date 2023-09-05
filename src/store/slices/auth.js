import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: undefined,
  login: undefined,
  loginRequested: false,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
    },
    authStopLoading: (state) => {
      state.loading = false;
    },
    storeJWT(state, action) {
      state.jwt = action.payload;
      state.loading = false;
      state.error = null;
      return state;
    },
    storeLogin(state, action) {
      state.login = action.payload;
      return state;
    },
    setLoginRequested(state, action) {
      state.loginRequested = action.payload;
      return state;
    },
    authFailure: (state, action) => {
      state.jwt = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default slice;

export const {
  storeJWT,
  storeLogin,
  setLoginRequested,
  authStart,
  authFailure,
  authStopLoading,
} = slice.actions;

export const getJWT = (state) => {
  return state.auth.jwt;
};
export const getLogin = (state) => {
  return state.auth.login;
};
export const getAuthLoading = (state) => {
  return state.auth.loading;
};

export const isLoginRequested = (state) => {
  return state.auth.loginRequested;
};
export const getLoginFromJWT = (jwt) => {
  if (jwt) {
    const base64Url = jwt.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload).sub;
  }
};
