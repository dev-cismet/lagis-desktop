import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lagisLandparcel: undefined,
  alkisLandparcel: undefined,
  history: undefined,
  rebe: undefined,
  mipa: undefined,
};

const slice = createSlice({
  name: "lagis",
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
    storeRebe(state, action) {
      state.rebe = action.payload;
      return state;
    },
    storeMipa(state, action) {
      state.mipa = action.payload;
      return state;
    },
  },
});

export default slice;

export const {
  storeLagisLandparcel,
  storeAlkisLandparcel,
  storeRebe,
  storeMipa,
} = slice.actions;

export const getLandparcel = (state) => {
  return state.lagis.lagisLandparcel;
};
export const getAlkisLandparcel = (state) => {
  return state.lagis.alkisLandparcel;
};

export const getStreetfronts = (state) => {
  if (
    state.lagis &&
    state.lagis.lagisLandparcel[0]?.strassenfrontArrayRelationShip
  ) {
    return state.lagis.lagisLandparcel[0].strassenfrontArrayRelationShip;
  }
  return state.lagis.lagisLandparcel;
};

export const getAdditionalRoll = (state) => {
  if (
    state.lagis &&
    state.lagis.lagisLandparcel[0]?.zusatz_rolleArrayRelationShip
  ) {
    return state.lagis.lagisLandparcel[0].zusatz_rolleArrayRelationShip;
  }
  return state.lagis.lagisLandparcel;
};
export const getAgenciesRoll = (state) => {
  if (
    state.lagis &&
    state.lagis.lagisLandparcel[0]
      ?.verwaltungsbereiche_eintragArrayRelationShip[0]
      .verwaltungsbereichArrayRelationShip[0]
  ) {
    return state.lagis.lagisLandparcel[0]
      ?.verwaltungsbereiche_eintragArrayRelationShip[0]
      .verwaltungsbereichArrayRelationShip[0];
  }
  return undefined;
};

export const getUrlLandparcelParams = (state) => {
  const alkisId = state.lagis?.alkisLandparcel?.alkis_id;
  // const schluesselId = state.lagis.lagisLandparcel.id;
  if (alkisId) {
    return {
      alkisId: alkisId,
      // schluesselId: schluesselId,
    };
  }
  return state.lagis.alkisLandparcel;
};
