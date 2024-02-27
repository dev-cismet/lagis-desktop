import { nanoid } from "@reduxjs/toolkit";
import { getColorFromCode } from "../tools/helper";
import {
  getOfficesWithColorAndSquare,
  geHistoricalArraytOfficesWithColorAndSquare,
} from "../tools/helper";

export function noteExtractor(dataIn) {
  if (dataIn === undefined) {
    return {
      currentText: "",
    };
  } else {
    const lagisLandparcel = dataIn;
    const currentText = lagisLandparcel?.bemerkung || "";
    const bemerkungSperre =
      lagisLandparcel?.flurstueck_schluessel.bemerkung_sperre || null;

    return {
      currentText,
      ifBemerkungSperre: bemerkungSperre === "Stei" ? true : false,
    };
  }
}
export function streetfrontsExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const lagisLandparcel = dataIn;
    const streetfronts = lagisLandparcel?.strassenfrontArrayRelationShip || [];
    if (streetfronts.length !== 0) {
      return streetfronts.map((s) => ({
        id: s.id,
        street: s.strassenname,
        length: s.laenge,
      }));
    } else {
      return [];
    }
  }
}
export function additionalRollExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const lagisLandparcel = dataIn;
    const additionalRoll = lagisLandparcel?.zusatz_rolleArrayRelationShip || [];
    let additionalRoleColor = "";
    if (additionalRoll.length !== 0) {
      const rolleArr = additionalRoll.map((r) => {
        return {
          id: r.verwaltende_dienststelle.ressort.id,
          agency: `${r.verwaltende_dienststelle.ressort.abkuerzung}.${r.verwaltende_dienststelle.abkuerzung_abteilung}`,
          rolle: `${r.zusatz_rolle_art.name}`,
          color: getColorFromCode(
            r.verwaltende_dienststelle.farbeArrayRelationShip[0].rgb_farbwert
          ),
        };
      });

      return rolleArr;
    } else {
      return [];
    }
  }
}
export function officesPageExtractor(dataIn) {
  if (dataIn === undefined) {
    return { currentOffices: [], history: 0 };
  } else {
    const landparcel = dataIn;
    const officesData =
      landparcel?.verwaltungsbereiche_eintragArrayRelationShip || [];
    const lastOffice = officesData[officesData.length - 1];
    const history = officesData.slice(0, officesData.length - 1);
    const historyData = geHistoricalArraytOfficesWithColorAndSquare(
      history,
      dataIn
    );
    const nameGeomColorData = getOfficesWithColorAndSquare(lastOffice, dataIn);

    const agencyTableFields = nameGeomColorData.map((a) => ({
      id: nanoid(),
      agency: a.title,
      area: a.size ? a.size : "",
      color: a.color,
      extraGeomeOffice: a.officeGeom,
    }));

    return { currentOffices: agencyTableFields, history: historyData };
  }
}

export const mapOfficesExtractor = ({
  landparcel,
  extraAgencyGeom,
  ondblclick,
}) => {
  if (extraAgencyGeom) {
    const feature = {
      type: "Feature",
      featureType: "landparcel",
      id: "landparcel." + landparcel?.id || "noIdBCtmpGeom",
      geometry: extraAgencyGeom,
      featuretype: landparcel ? "lagis" : "private",
      crs: extraAgencyGeom?.crs,
      properties: {
        id: landparcel?.id,
      },
      officeColor: extraAgencyGeom.color,
    };

    // const officesData =
    //   landparcel?.verwaltungsbereiche_eintragArrayRelationShip || [];
    // const lastOffice = officesData[officesData.length - 1] || [];
    // console.log("xxx lastOffice", lastOffice);

    // let officesGeomArr = [];
    // if (lastOffice?.verwaltungsbereichArrayRelationShip) {
    //   lastOffice?.verwaltungsbereichArrayRelationShip.forEach((office, idx) => {
    //     if (office.extended_geom) {
    //       const color = getColorFromCode(
    //         office.verwaltende_dienststelle.farbeArrayRelationShip[0]
    //           ?.rgb_farbwert || ""
    //       );
    //       const feature = {
    //         type: "Feature",
    //         featureType: "landparcel",
    //         id: "landparcel." + landparcel?.id || "noIdBCtmpGeom",
    //         geometry: {
    //           ...office.extended_geom.geo_field,
    //         },
    //         featuretype: landparcel ? "lagis" : "private",
    //         crs: {
    //           type: "name",
    //           properties: {
    //             name: "urn:ogc:def:crs:EPSG::25832",
    //           },
    //         },
    //         properties: {
    //           id: landparcel?.id,
    //         },
    //         color,
    //         // selectedOffice: idx === selectedOffice,
    //       };
    //       officesGeomArr.push(feature);
    //     }
    //   });
    // }

    return {
      homeCenter: [51.272570027476256, 7.19963690266013],
      homeZoom: 16,
      featureCollection: extraAgencyGeom ? [feature] : [],

      styler: (feature) => {
        const style = {
          color: "#005F6B",
          weight: 1,
          opacity: 0.6,
          fillColor: feature.officeColor,
          fillOpacity: 0.6,
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
