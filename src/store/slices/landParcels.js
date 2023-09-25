import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  landParcels: undefined,
  landmarks: undefined,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "landParcels",
  initialState,
  reducers: {
    fetchLandParcelsStart: (state) => {
      state.loading = true;
    },
    storeLandParcels(state, action) {
      state.landParcels = action.payload;
      state.loading = false;
      state.error = null;
      return state;
    },
    fetchLandParcelsFailure(state, action) {
      state.landParcels = null;
      state.loading = false;
      state.error = action.payload;
      return state;
    },
    storeLandmarks(state, action) {
      state.landmarks = action.payload;
      state.loading = false;
      state.error = null;
      return state;
    },
    fetchLandLandmarksFailure(state, action) {
      state.landParcels = null;
      state.loading = false;
      state.error = action.payload;
      return state;
    },
  },
});

export default slice;

export const {
  storeLandParcels,
  storeLandmarks,
  fetchLandParcelsStart,
  fetchLandParcelsFailure,
  fetchLandLandmarksFailure,
} = slice.actions;

export const getLandParcels = (state) => {
  return state.landParcels;
};
export const getLandmarks = (state) => {
  return state.landParcels;
};
export const getLandmarksLoading = (state) => {
  return state.landParcels.loading;
};
