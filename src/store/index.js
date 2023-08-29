import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import localForage from "localforage";
import storage from "redux-persist/lib/storage";
console.log("store initializing ....");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["jwt", "login"],
};

export default configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authSlice.reducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
