import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flurstueck: {},
};

const slice = createSlice({
  name: "flurstueck",
  initialState,
  reducers: {
    storeFlurstueck(state, action) {
      state.flurstueck = action.payload;
      return state;
    },
  },
});

export default slice;

export const { storeFlurstueck } = slice.actions;

export const getFlurstueck = (state) => {
  return state.flurstueck;
};
