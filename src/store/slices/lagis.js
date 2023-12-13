import { createSlice } from "@reduxjs/toolkit";
import { fetchGraphQL, fetchGraphQLFromWuNDa } from "../../core/graphql";
import queries from "../../core/queries/online";
import { getBuffer25832 } from "../../core/tools/mappingTools";
import { getLandparcelStringFromAlkisLandparcel } from "../../core/tools/helper";
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
export const fetchFlurstueck = (schluessel_id, alkis_id, navigate) => {
  return async (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    if (jwt) {
      const result = await fetchGraphQL(
        queries.getLagisLandparcelByFlurstueckSchluesselId,
        {
          schluessel_id,
          alkis_id,
        },
        jwt
      );

      if (result.status === 401) {
        return navigate("/login");
      }

      const f = result?.data.flurstueck[0];
      f.alkisLandparcel = result?.data.extended_alkis_flurstueck[0];

      dispatch(storeLagisLandparcel(f));
      dispatch(storeAlkisLandparcel(f.alkisLandparcel));

      let geo =
        result?.data.flurstueck[0].extended_geom?.geo_field ||
        result?.data.flurstueck[0].alkisLandparcel?.geometrie;

      if (!geo) {
        const resultGeo = await getGeomFromWuNDa(alkis_id, jwt, navigate);
        geo = resultGeo.data.flurstueck[0].extended_geom.geo_field;
      }
      dispatch(storeGeometry(geo));

      if (geo) {
        await fetchRebe(getBuffer25832(geo, -1), jwt, dispatch);
        await fetchMipa(getBuffer25832(geo, -1), jwt, dispatch);
      } else {
        dispatch(storeRebe());
        dispatch(storeMipa());
      }

      await fetchHistory(schluessel_id, jwt, dispatch);
    }
  };
};

export const getGeomFromWuNDa = async (alkis_id, jwt, navigate) => {
  const result = await fetchGraphQLFromWuNDa(
    queries.getGeomFromWuNDA,
    {
      alkis_id,
    },
    jwt
  );
  if (result.status === 401) {
    return navigate("/login");
  }
  return result;
};

export const fetchHistory = async (sid, jwt, dispatch, navigate) => {
  try {
    const result = await fetchGraphQL(
      queries.history,
      {
        schluessel_id: sid,
      },
      jwt
    );
    if (result.status === 401) {
      return navigate("/login");
    }
    dispatch(storeHistory(result?.data?.cs_calc_history));
  } catch (e) {
    console.log("xxx error in getHistory", e);
  }
};

const fetchRebe = async (geo, jwt, dispatch, navigate) => {
  const result = await fetchGraphQL(
    queries.getRebeByGeo,
    {
      geo,
    },
    jwt
  );
  if (result.status === 401) {
    return navigate("/login");
  }
  dispatch(storeRebe(result?.data?.rebe));
};
const fetchMipa = async (geo, jwt, dispatch, navigate) => {
  const result = await fetchGraphQL(
    queries.getMipaByGeo,
    {
      geo,
    },
    jwt
  );
  if (result.status === 401) {
    return navigate("/login");
  }
  dispatch(storeMipa(result?.data?.mipa));
};

export const fetchContractById = async (vertag_id, jwt, landparcel) => {
  console.log("fetchContractById");
  const result = await fetchGraphQL(
    queries.getQuerverweiseByVertragId,
    {
      vertag_id,
    },
    jwt
  );
  if (result.data?.flurstueck) {
    const currentLandparcel =
      getLandparcelStringFromAlkisLandparcel(landparcel);
    const landparcelsArr = [];
    const data = result.data?.flurstueck.forEach((f) => {
      const flur = f.flurstueck_schluessel.flur;
      const zaehler = f.flurstueck_schluessel.flurstueck_zaehler;
      const nenner = f.flurstueck_schluessel.flurstueck_nenner;
      const gemarkung = f.flurstueck_schluessel.gemarkung.bezeichnung;
      const crossReference = `${gemarkung} ${flur} ${zaehler}/${nenner}`;
      if (crossReference !== currentLandparcel) {
        landparcelsArr.push(crossReference);
      }
    });

    return landparcelsArr;
  } else {
    [];
  }
};

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

const getGemarkungByName = (name) => {
  const result = Object.keys(landparcelInternaDataStructure).find((key) => {
    return landparcelInternaDataStructure[key].gemarkung === name;
  });
  if (result) {
    return landparcelInternaDataStructure[result];
  }
};
export const switchToLandparcel = ({ gem, flur, fstck }) => {
  return async (dispatch, getState) => {
    if (gem && flur && fstck) {
      const fullGemarkung = getGemarkungByName(gem);
      setSelectedGemarkung(fullGemarkung);
      const fullFlur = fullGemarkung.flure[padWithZeros(flur, 3)];
      setSelectedFlur(fullFlur);

      //check whether fstck is conatining a dash
      const splitted = fstck.split("-");
      let fstckLabel;
      let pureLabel;
      if (splitted.length === 2 && splitted[1] !== "0") {
        fstckLabel =
          padWithZeros(splitted[0], 5) + "/" + padWithZeros(splitted[1], 4);
      } else {
        fstckLabel = padWithZeros(splitted[0], 5);
        // pureLabel = fstck;
      }
      const x = {
        gemarkung: fullGemarkung.gemarkung,
        flur: fullFlur.flur,
        ...fullFlur.flurstuecke[fstckLabel],
      };
      if (fullGemarkung && fullFlur && fullFlur.flurstuecke[fstckLabel]) {
        setSelectedFlurstueckLabel(fstckLabel);
        flurstueckChoosen(x);
      } else {
        setSelectedFlurstueckLabel();
      }
    } else if (gem && flur) {
      const fullGemarkung = getGemarkungByName(gem);
      setSelectedGemarkung(fullGemarkung);
      const fullFlur = fullGemarkung.flure[padWithZeros(flur, 3)];
      setSelectedFlur(fullFlur);
      setSelectedFlurstueckLabel();
      dispatch(storeAlkisLandparcel(undefined));
      dispatch(storeLagisLandparcel(undefined));
      dispatch(storeRebe(undefined));
      dispatch(storeMipa(undefined));
    } else if (gem || selectedGemarkung) {
      if (gem || selectedGemarkung) {
        const fullGemarkung = getGemarkungByName(gem);
        setSelectedGemarkung(fullGemarkung);
        setSelectedFlur();
        setSelectedFlurstueckLabel();
        dispatch(storeAlkisLandparcel(undefined));
        dispatch(storeLagisLandparcel(undefined));
        dispatch(storeRebe(undefined));
        dispatch(storeMipa(undefined));
      }
    }
  };
};
