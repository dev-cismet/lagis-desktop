import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import flurstueckSlice from "./slices/flurstueck";
import landParcels from "./slices/landParcels";
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

const persistParcelsConfig = {
  key: "@lagis-desktop.1.app.landparcels",
  storage: localForage,
  whitelist: ["landParcels", "landmarks"],
};

export default configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authSlice.reducer),
    flurstueck: flurstueckSlice.reducer,
    landParcels: persistReducer(persistParcelsConfig, landParcels.reducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
