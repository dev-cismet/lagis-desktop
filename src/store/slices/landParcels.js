import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  landParcels: undefined,
};

const slice = createSlice({
  name: "landParcels",
  initialState,
  reducers: {
    storeLandParcels(state, action) {
      state.landParcels = action.payload;
      return state;
    },
  },
});

export default slice;

export const { storeLandParcels } = slice.actions;

export const getLandParcels = (state) => {
  return state.landParcels;
};
