import * as turf from "@turf/turf";
import { getColorFromCode } from "../tools/helper";
import area from "@turf/area";
import proj4 from "proj4";
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
    const landparcel = dataIn[0];
    console.log("Offices Overview Extractor Landparcel!", landparcel);

    const officesData = landparcel.verwaltungsbereiche_eintragArrayRelationShip;
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
          let square = item.geom?.geo_field || 0;
          if (square !== 0) {
            // const polygon = turf.polygon(square);
            const area = calcArea(square);
            square = area;
          }
          const title = `${item.verwaltende_dienststelle.ressort.abkuerzung}.${item.verwaltende_dienststelle.abkuerzung_abteilung}`;
          nameGeomColorData.push({
            title,
            size: square,
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

const calcArea = (geom) => {
  let newCoords = [];
  const proj4crs25832def = "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs";
  const targetCrs = proj4.defs("EPSG:4326");
  let isMulti = false;

  try {
    for (const coord of geom.coordinates) {
      if (geom.type === "MultiPolygon") {
        let coordArray = [];
        isMulti = true;

        for (const coordPair of coord) {
          const transformedGeom = proj4(proj4crs25832def, targetCrs, coordPair);
          coordArray.push(transformedGeom);
        }
        newCoords.push(coordArray);
      } else {
        console.log("Offices Overview Extractor geom else");
        const transformedGeom = proj4(proj4crs25832def, targetCrs, coord);
        newCoords.push(transformedGeom);
      }
    }
  } catch (o) {
    console.log(
      "Offices Overview Extractor cannot calculate geometry area " + geom
    );
  }

  const geo = {
    type: "Feature",
    geometry: {
      type: isMulti === true ? "MultiPolygon" : "Polygon",
      coordinates: newCoords,
    },
    properties: {},
  };

  let len = area(geo);
  return len;
};
