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
export const getMipa = (state) => {
  return state.lagis.mipa;
};
export const getRebe = (state) => {
  return state.lagis.rebe;
};

export const getOffices = (state) => {
  const offices =
    state.lagis.lagisLandparcel?.verwaltungsbereiche_eintragArrayRelationShip ||
    [];
  if (
    offices.length > 0 &&
    offices[0]?.verwaltungsbereichArrayRelationShip.length === 0
  ) {
    return [];
  }
  return offices;
};
export const getAdditionalRollen = (state) => {
  return state.lagis?.lagisLandparcel?.zusatz_rolleArrayRelationShip || [];
};
export const getStreetFronts = (state) => {
  return state.lagis?.lagisLandparcel?.strassenfrontArrayRelationShip || [];
};

export const getUsage = (state) => {
  return state.lagis.lagisLandparcel?.nutzungArrayRelationShip || undefined;
};
export const getContract = (state) => {
  return state.lagis.lagisLandparcel?.ar_vertraegeArray || undefined;
};
export const getTransaction = (state) => {
  return (
    state.lagis.lagisLandparcel?.kassenzeichenArrayRelationShip || undefined
  );
};
export const getDms = (state) => {
  return state.lagis.lagisLandparcel?.dms_urlArrayRelationShip || undefined;
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
