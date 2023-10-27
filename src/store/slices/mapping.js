import { createSlice } from "@reduxjs/toolkit";
import {
  fitFeatureArray,
  getBoundsForFeatureArray,
  getCenterAndZoomForBounds,
} from "../../core/tools/mappingTools";

const initialState = {
  flaechenCollection: undefined,
  frontenCollection: undefined,
  generalGeometryCollection: undefined,
  befreiungErlaubnisCollection: undefined,
  leafletElement: undefined,
  featureCollection: undefined,
  showCurrentFeatureCollection: true,
  showBackground: true,
  additionalLayerOpacities: {
    nrwAlkisFstck: 0.7,
    nrwAlkisGebaeude: 0.7,
  },
};

const slice = createSlice({
  name: "mapping",
  initialState,
  reducers: {
    setFlaechenCollection(state, action) {
      state.flaechenCollection = action.payload;
      return state;
    },
    setFrontenCollection(state, action) {
      state.frontenCollection = action.payload;
      return state;
    },
    setGeneralGeometryCollection(state, action) {
      state.generalGeometryCollection = action.payload;
      return state;
    },
    setGeneralGeometrySelected(state, action) {
      const { id } = action.payload;
      const selectedObject = state.generalGeometryCollection.find(
        (item) => item.properties.id === id
      );

      if (selectedObject.selected) {
        // clicked on an already selected feature and set map to optimally display that feature
        const bb = getBoundsForFeatureArray([selectedObject]);
        state.leafletElement?.fitBounds(bb);
      } else {
        state.generalGeometryCollection.forEach((item) => {
          item.selected = false;
        });

        if (selectedObject) {
          selectedObject.selected = true;
        }
      }

      return state;
    },
    setFlaechenSelected(state, action) {
      const { id } = action.payload;
      const selectedObject = state.flaechenCollection.find(
        (item) => item.properties.id === `flaeche.${id}`
      );

      if (selectedObject.selected) {
        // clicked on an already selected feature and set map to optimally display that feature
        const bb = getBoundsForFeatureArray([selectedObject]);
        state.leafletElement?.fitBounds(bb);
      } else {
        state.flaechenCollection.forEach((item) => {
          item.selected = false;
        });

        if (selectedObject) {
          selectedObject.selected = true;
        }
      }

      return state;
    },
    setFeatureHovered(state, action) {
      const { id } = action.payload;

      state.featureCollection.forEach((item) => {
        item.id === id ? (item.hovered = true) : (item.hovered = false);
      });

      return state;
    },
    setFrontenSelected(state, action) {
      const { id } = action.payload;
      const selectedObject = state.frontenCollection.find(
        (item) => item.properties.id === id
      );

      if (selectedObject.selected) {
        // clicked on an already selected feature and set map to optimally display that feature
        const bb = getBoundsForFeatureArray([selectedObject]);
        state.leafletElement?.fitBounds(bb);
      } else {
        state.frontenCollection.forEach((item) => {
          item.selected = false;
        });

        if (selectedObject) {
          selectedObject.selected = true;
        }
      }

      return state;
    },
    setBefreiungErlaubnisCollection(state, action) {
      state.befreiungErlaubnisCollection = action.payload;
      return state;
    },
    setLeafletElement(state, action) {
      state.leafletElement = action.payload;
      return state;
    },
    setFeatureCollection(state, action) {
      state.featureCollection = action.payload;
      return state;
    },
    setShowCurrentFeatureCollection(state, action) {
      state.showCurrentFeatureCollection = action.payload;
      return state;
    },
    setShowBackground(state, action) {
      state.showBackground = action.payload;
      return state;
    },
    setLayerOpacity(state, action) {
      const { layer, opacity } = action.payload;
      state.additionalLayerOpacities[layer] = opacity;
      return state;
    },
    clear(state) {
      state.flaechenCollection = undefined;
      state.frontenCollection = undefined;
      state.generalGeometryCollection1 = undefined;
      state.befreiungErlaubnisCollection = undefined;
      return state;
    },
  },
});

export default slice;

export const {
  setFlaechenCollection,
  setFrontenCollection,
  setGeneralGeometryCollection,
  setGeneralGeometrySelected,
  setFlaechenSelected,
  setFeatureHovered,
  setFrontenSelected,
  setBefreiungErlaubnisCollection,
  setLeafletElement,
  setFeatureCollection,
  setShowCurrentFeatureCollection,
  setShowBackground,
  setLayerOpacity,
  clear,
} = slice.actions;

export const getFlaechenCollection = (state) => {
  return state.mapping.flaechenCollection;
};

export const getFrontenCollection = (state) => {
  return state.mapping.frontenCollection;
};

export const getGeneralGeometryCollection = (state) => {
  return state.mapping.generalGeometryCollection;
};

export const getBefreiungErlaubnisCollection = (state) => {
  return state.mapping.befreiungErlaubnisCollection;
};

export const getFeatureCollection = (state) => {
  return state.mapping.featureCollection;
};

export const getShowCurrentFeatureCollection = (state) => {
  return state.mapping.showCurrentFeatureCollection;
};

export const getShowBackground = (state) => {
  return state.mapping.showBackground;
};

export const getAdditionalLayerOpacities = (state) => {
  return state.mapping.additionalLayerOpacities;
};
