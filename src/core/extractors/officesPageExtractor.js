import { getColorFromCode } from "../tools/helper";
import { nanoid } from "@reduxjs/toolkit";
export function noteExtractor(dataIn) {
  if (dataIn === undefined) {
    return {
      currentText: "",
    };
  } else {
    const lagisLandparcel = dataIn;
    const currentText = lagisLandparcel?.bemerkung || "";
    return {
      currentText,
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
        key: s.id,
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
    return { rolle: [], additionalRoleColor: "" };
  } else {
    const lagisLandparcel = dataIn;
    const additionalRoll = lagisLandparcel?.zusatz_rolleArrayRelationShip || [];
    let additionalRoleColor = "";

    if (additionalRoll.length !== 0) {
      const rolleArr = additionalRoll.map((r) => {
        if (r.verwaltende_dienststelle.farbeArrayRelationShip[0].rgb_farbwert) {
          additionalRoleColor = getColorFromCode(
            r.verwaltende_dienststelle.farbeArrayRelationShip[0].rgb_farbwert
          );
        }
        return {
          key: r.zusatz_rolle_art.id,
          agency: `${r.verwaltende_dienststelle.ressort.abkuerzung}.${r.verwaltende_dienststelle.abkuerzung_abteilung}`,
          rolle: `${r.zusatz_rolle_art.name}`,
        };
      });

      return { rolle: rolleArr, additionalRoleColor };
    } else {
      return [];
    }
  }
}
