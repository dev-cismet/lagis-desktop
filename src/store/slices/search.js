import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contractFlurstucke: undefined,
  mipaFlurstucke: undefined,
  loading: false,
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
    storeLoading(state, action) {
      state.loading = action.payload;
      return state;
    },
  },
});

export default slice;

export const { storeContractFlurstucke, storeMipaFlurstucke, storeLoading } =
  slice.actions;

export const getContractFlurstucke = (state) => {
  return state.search.contractFlurstucke;
};
export const getMipaFlurstucke = (state) => {
  return state.search.mipaFlurstucke;
};
export const getLoading = (state) => {
  return state.search.loading;
};
