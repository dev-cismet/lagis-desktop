import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contractFlurstucke: undefined,
  mipaFlurstucke: undefined,
};

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    storeContractFlurstucke(state, action) {
      state.contractFlurstucke = action.payload;
      return state;
    },
    storeMipaFlurstucke(state, action) {
      state.mipaFlurstucke = action.payload;
      return state;
    },
  },
});

export default slice;

export const { storeContractFlurstucke, storeMipaFlurstucke } = slice.actions;

export const getContractFlurstucke = (state) => {
  return state.search.contractFlurstucke;
};
export const getMipaFlurstucke = (state) => {
  return state.search.mipaFlurstucke;
};
