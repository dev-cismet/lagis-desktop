import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
export function mipaPageExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const mipa = dataIn;
    if (mipa.length > 0) {
      let formattedVertragsbeginn;
      let formattedVertragsende;
      const data = mipa.map((m, idx) => {
        if (m.vertragsbeginn) {
          const dateVertragsbeginn = dayjs(m.vertragsbeginn).toDate();
          formattedVertragsbeginn =
            dayjs(dateVertragsbeginn).format("DD.MM.YYYY");
        } else {
          formattedVertragsbeginn = null;
        }
        if (m.vertragsende) {
          const dateVertragsende = dayjs(m.vertragsende).toDate();
          formattedVertragsende = dayjs(dateVertragsende).format("DD.MM.YYYY");
        } else {
          formattedVertragsende = null;
        }
        return {
          id: idx,
          lage: m.lage,
          aktenzeichen: m.aktenzeichen,
          flaeche: m.flaeche,
          nutzung: m.mipa_nutzung.mipa_kategorie.bezeichnung,
          vertragsbegin: formattedVertragsbeginn,
          vertragsende: formattedVertragsende,
          merkmale: m.ar_mipa_merkmaleArray ? m.ar_mipa_merkmaleArray : [],
          querverweise: "",
          note: m.bemerkung ? m.bemerkung : "",
          extendedGeom: m.extended_geom,
        };
      });

      return data;
    }

    return [];
  }
}

export const mapMipaExtractor = ({
  landparcel,
  geometry,
  extraGeom,
  selectedTableRowId,
  ondblclick,
}) => {
  if (extraGeom && geometry) {
    const feature = {
      type: "Feature",
      featureType: "landparcel",
      id: "landparcel." + landparcel?.id || "noIdBCtmpGeom",
      geometry: geometry,
      featuretype: landparcel ? "lagis" : "private",
      crs: geometry?.crs,
      properties: {
        id: landparcel?.id,
      },
      tableId: selectedTableRowId,
      isCommonGeometry: true,
      selectedTableGeom: false,
    };

    const features = [feature];
    extraGeom.forEach((rent) => {
      const { extendedGeom, id: tableId } = rent;
      const feature = {
        type: "Feature",
        featureType: "landparcel",
        id: "landparcel." + landparcel?.id || "noIdBCtmpGeom",
        geometry: {
          ...extendedGeom.geo_field,
        },
        featuretype: landparcel ? "lagis" : "private",
        crs: {
          type: "name",
          properties: {
            name: "urn:ogc:def:crs:EPSG::25832",
          },
        },
        properties: {
          id: landparcel?.id,
        },
        tableId,
        selectedTableGeom: selectedTableRowId === tableId,
        isCommonGeometry: false,
      };

      features.push(feature);
    });

    return {
      homeCenter: [51.272570027476256, 7.19963690266013],
      homeZoom: 16,
      featureCollection: features,
      styler: (feature) => {
        const style = {
          color: "#005F6B",
          weight: feature.selectedTableGeom ? 3 : 1,
          opacity: feature.selectedTableGeom ? 1 : 0.5,
          fillColor: feature.isCommonGeometry
            ? "#F2E2C2"
            : feature.featuretype === "lagis"
            ? "#26ADE4"
            : "#F2E2C2",
          // fillOpacity: 0.6,
          fillOpacity: feature.selectedTableGeom ? 0.8 : 0.35,
          className: "landparcel-" + feature.properties.id,
        };
        return style;
      },
      ondblclick,
    };
  } else {
    return {
      homeCenter: [51.272570027476256, 7.19963690266013],
      homeZoom: 13,
      featureCollection: [],
      ondblclick,
    };
  }
};
