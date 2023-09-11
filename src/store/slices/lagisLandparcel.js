import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lagisLandparcel: undefined,
  alkisLandparcel: undefined,
};

const slice = createSlice({
  name: "lagisLandparcel",
  initialState,
  reducers: {
    storeLagisLandparcel(state, action) {
      state.lagisLandparcel = action.payload;
      return state;
    },
    storeAlkisLandparcel(state, action) {
      state.alkisLandparcel = action.payload;
      return state;
    },
  },
});

export default slice;

export const { storeLagisLandparcel, storeAlkisLandparcel } = slice.actions;

export const getLandparcel = (state) => {
  return state.lagisLandparcel.lagisLandparcel;
};
export const getAlkisLandparcel = (state) => {
  return state.lagisLandparcel.alkisLandparcel;
};

export const getStreetfronts = (state) => {
  if (
    state.lagisLandparcel &&
    state.lagisLandparcel.lagisLandparcel[0]?.strassenfrontArrayRelationShip
  ) {
    return state.lagisLandparcel.lagisLandparcel[0]
      .strassenfrontArrayRelationShip;
  }
  return state.lagisLandparcel.lagisLandparcel;
};

export const getAdditionalRoll = (state) => {
  if (
    state.lagisLandparcel &&
    state.lagisLandparcel.lagisLandparcel[0]?.zusatz_rolleArrayRelationShip
  ) {
    return state.lagisLandparcel.lagisLandparcel[0]
      .zusatz_rolleArrayRelationShip;
  }
  return state.lagisLandparcel.lagisLandparcel;
};
export const getAgenciesRoll = (state) => {
  if (
    state.lagisLandparcel &&
    state.lagisLandparcel.lagisLandparcel[0]
      ?.verwaltungsbereiche_eintragArrayRelationShip[0]
      .verwaltungsbereichArrayRelationShip[0]
  ) {
    return state.lagisLandparcel.lagisLandparcel[0]
      ?.verwaltungsbereiche_eintragArrayRelationShip[0]
      .verwaltungsbereichArrayRelationShip[0];
  }
  return undefined;
};

export const getUrlLandparcelParams = (state) => {
  const alkisId = state.lagisLandparcel?.alkisLandparcel[0]?.alkis_id;
  const schluesselId = state.lagisLandparcel.lagisLandparcel[0].id;
  if (alkisId && schluesselId) {
    return {
      alkisId: alkisId,
      schluesselId: schluesselId,
    };
  }
  return undefined;
};
