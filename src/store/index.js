import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import flurstueckSlice from "./slices/flurstueck";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import localForage from "localforage";
console.log("store initializing ....");

const persistConfig = {
  key: "@lagis-desktop.1.app.auth",
  storage: localForage,
  whitelist: ["jwt", "login"],
};

export default configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authSlice.reducer),
    flurstueck: flurstueckSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
