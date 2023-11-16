import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  lagisLandparcel: undefined,
  alkisLandparcel: undefined,
  rebe: undefined,
  mipa: undefined,
  history: undefined,
  historieHalten: undefined,
  historieHaltenRootText: undefined,
  geometry: undefined,
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
    storeHistory(state, action) {
      state.history = action.payload;
      return state;
    },
    storeGeometry(state, action) {
      state.geometry = action.payload;
      return state;
    },
    storeHistorieHalten(state, action) {
      state.historieHalten = action.payload;
      return state;
    },
    storeHistorieHaltenRootText(state, action) {
      state.historieHaltenRootText = action.payload;
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
  storeHistory,
  storeGeometry,
  storeHistorieHalten,
  storeHistorieHaltenRootText,
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
export const getHistory = (state) => {
  return state.lagis.history;
};
export const getGeometry = (state) => {
  return state.lagis.geometry;
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

export const getHistorieHalten = (state) => {
  return state.lagis.historieHalten;
};

export const getHistorieHaltenRootText = (state) => {
  return state.lagis.historieHaltenRootText;
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
export const getCountOfUsage = (state) => {
  const allUsages =
    state.lagis.lagisLandparcel?.nutzungArrayRelationShip || undefined;
  if (allUsages) {
    const numberOfUsages = allUsages.length || 0;
    let counter = 0;
    if (numberOfUsages !== 0) {
      allUsages?.forEach((u, idx) => {
        u.nutzung_buchungArrayRelationShip.forEach((item, idx) => {
          if (item.gueltig_bis === null) {
            counter++;
          }
        });
      });

      return counter;
    }
  } else {
    return undefined;
  }
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
