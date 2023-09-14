import { getColorFromCode } from "../tools/helper";
import area from "@turf/area";
import proj4 from "proj4";
import { getArea25832 } from "../tools/mappingTools";
export function rentExtractor(dataIn) {
  if (dataIn === undefined) {
    return {
      numberOfRents: "  ",
      color: "#BBBBBB",
    };
  } else {
    const landparcel = dataIn[0];
    const numberOfRents = landparcel?.ar_vertraegeArray?.length || 0;
    return {
      numberOfRents,
      color: numberOfRents > 0 ? "#5D5FEF" : "#999999",
    };
  }
}
export function officesExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const landparcel = dataIn;

    const officesData =
      landparcel?.verwaltungsbereiche_eintragArrayRelationShip || [];
    const nameGeomColorData = [];
    const checkTitleArray = [];
    officesData.forEach((of) => {
      const officesArr = of.verwaltungsbereichArrayRelationShip;
      officesArr.forEach((item) => {
        const currentTitle = item.verwaltende_dienststelle.ressort.abkuerzung;
        if (!checkTitleArray.includes(currentTitle)) {
          const color =
            item.verwaltende_dienststelle.farbeArrayRelationShip[0]
              .rgb_farbwert;
          let square =
            item.geom?.geo_field || dataIn.alkisLandparcel?.geometrie;
          let area;
          if (square !== undefined) {
            const raw = getArea25832(square);
            area = Math.round(raw * 10) / 10;
          }
          const title = `${item.verwaltende_dienststelle.ressort.abkuerzung}.${item.verwaltende_dienststelle.abkuerzung_abteilung}`;
          nameGeomColorData.push({
            title,
            size: area,
            color: getColorFromCode(color),
          });
          checkTitleArray.push(currentTitle);
        }
      });
    });

    console.log(
      "Offices Overview Extractor nameGeomColorData",
      nameGeomColorData
    );

    return nameGeomColorData;
  }
}
export function transactionExtractor(dataIn) {
  if (dataIn === undefined) {
    console.log("ex transaction extractor undefined", dataIn);
    return {
      numberOfDocuments: "  ",
      color: "#BBBBBB",
    };
  } else {
    const landparcel = dataIn;
    console.log("ex transaction extractor", landparcel);
    const numberOfDocuments =
      landparcel?.kassenzeichenArrayRelationShip?.length || 0;
    return {
      numberOfDocuments,
      color: numberOfDocuments > 0 ? "#5D5FEF" : "#999999",
    };
  }
}
