import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  syncLandparcel: false,
  mapOptionalLayerBuildings: 70,
  mapOptionalLayerParcels: 70,
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSyncLandparcel(state, action) {
      state.syncLandparcel = action.payload;
      return state;
    },
    setMapOptionalLayerBuildings(state, action) {
      state.mapOptionalLayerBuildings = action.payload;
      return state;
    },
    setMapOptionalLayerParcels(state, action) {
      state.mapOptionalLayerParcels = action.payload;
      return state;
    },
  },
});

export default slice;

export const {
  setSyncLandparcel,
  setMapOptionalLayerBuildings,
  setMapOptionalLayerParcels,
} = slice.actions;

export const getSyncLandparcel = (state) => {
  return state.ui.syncLandparcel;
};
export const getMapOptionalLayerBuildings = (state) => {
  return state.ui.mapOptionalLayerBuildings;
};
export const getMapOptionalLayerParcels = (state) => {
  return state.ui.mapOptionalLayerParcels;
};
