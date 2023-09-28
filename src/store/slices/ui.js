import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleDrawer: false,
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setToggleDrawer(state, action) {
      state.toggleDrawer = action.payload;
      return state;
    },
  },
});

export default slice;

export const { setToggleDrawer } = slice.actions;

export const getToggleDrawer = (state) => {
  return state.ui.toggleDrawer;
};
