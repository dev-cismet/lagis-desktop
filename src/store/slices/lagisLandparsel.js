import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lagisLandparcel: undefined,
};

const slice = createSlice({
  name: "lagisLandparcel",
  initialState,
  reducers: {
    storeLandparcel(state, action) {
      state.lagisLandparcel = action.payload;
      return state;
    },
  },
});

export default slice;

export const { storeLandparcel } = slice.actions;

export const getLandparcel = (state) => {
  return state.lagisLandparcel;
};
