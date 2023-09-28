import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  syncLandparcel: false,
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSyncLandparcel(state, action) {
      state.syncLandparcel = action.payload;
      return state;
    },
  },
});

export default slice;

export const { setSyncLandparcel } = slice.actions;

export const getSyncLandparcel = (state) => {
  return state.ui.syncLandparcel;
};
