import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import lagisLandparcelSlice from "./slices/lagisLandparcel";
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

const persistlagisLandparcelConfig = {
  key: "@lagis-desktop.1.app.lagisLandparcel",
  storage: localForage,
  whitelist: ["lagisLandparcel", "alkisLandparcel"],
};

export default configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authSlice.reducer),
    lagisLandparcel: persistReducer(
      persistlagisLandparcelConfig,
      lagisLandparcelSlice.reducer
    ),
    landParcels: persistReducer(persistParcelsConfig, landParcels.reducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
