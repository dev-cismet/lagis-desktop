import { getColorFromCode } from "../tools/helper";
import area from "@turf/area";
import proj4 from "proj4";
import { getArea25832 } from "../tools/mappingTools";

export function mipaExtractor(dataIn) {
  if (dataIn === undefined) {
    return {
      numberOfRents: " ",
      color: "#E0E0E0",
    };
  } else {
    const mipa = dataIn;
    const numberOfRents = mipa?.length || 0;
    return {
      numberOfRents,
      color: numberOfRents > 0 ? "#5D5FEF" : "#E0E0E0",
    };
  }
}
export function historyExtractor(dataIn) {
  if (dataIn === undefined || dataIn.length === 0) {
    return { color: "lightgray" };
  } else {
    return { color: "#FFD029", number: dataIn.length };
  }
}

export function officesExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const landparcel = dataIn;
    const officesData =
      landparcel?.verwaltungsbereiche_eintragArrayRelationShip || [];
    const lastOffice = officesData[officesData.length - 1];
    const nameGeomColorData = [];
    const checkTitleArray = [];

    lastOffice?.verwaltungsbereichArrayRelationShip.forEach((item) => {
      const currentTitle = item.verwaltende_dienststelle.ressort.abkuerzung;
      if (!checkTitleArray.includes(currentTitle)) {
        const color =
          item.verwaltende_dienststelle.farbeArrayRelationShip[0].rgb_farbwert;
        let square = item.geom?.geo_field || dataIn.alkisLandparcel?.geometrie;
        let area;
        if (square !== undefined) {
          const raw = getArea25832(square);
          area = Math.round(raw * 10) / 10;
        }
        const title = `${item.verwaltende_dienststelle.ressort.abkuerzung}.${item.verwaltende_dienststelle.abkuerzung_abteilung}`;
        nameGeomColorData.push({
          title,
          size: Math.round(area),
          color: getColorFromCode(color),
        });
        checkTitleArray.push(currentTitle);
      }
    });

    return nameGeomColorData;
  }
}
export function transactionExtractor(dataIn) {
  if (dataIn === undefined) {
    return {
      numberOfDocuments: "  ",
      color: "#E0E0E0",
    };
  } else {
    const landparcel = dataIn;
    const numberOfDocuments =
      landparcel?.kassenzeichenArrayRelationShip?.length || 0;
    return {
      numberOfDocuments,
      color: numberOfDocuments > 0 ? "#5D5FEF" : "#E0E0E0",
    };
  }
}
export function operationExtractor(dataIn) {
  if (dataIn === undefined) {
    return {
      numberOfOperations: "  ",
      color: "#389EFD",
    };
  } else {
    const landparcel = dataIn;
    const numberOfOperations = landparcel?.ar_vertraegeArray?.length || 0;
    return {
      numberOfOperations,
      color: numberOfOperations > 0 ? "#389EFD" : "#E0E0E0",
    };
  }
}

export function usageExtractor(dataIn) {
  if (dataIn === undefined) {
    return {
      numberOfUsages: "  ",
      color: "#E0E0E0",
    };
  } else {
    const landparcel = dataIn;
    const numberOfUsages = landparcel?.nutzungArrayRelationShip?.length || 0;
    let counter = 0;
    if (numberOfUsages !== 0) {
      landparcel?.nutzungArrayRelationShip?.forEach((u, idx) => {
        u.nutzung_buchungArrayRelationShip.forEach((item, idx) => {
          if (item.gueltig_bis === null) {
            counter++;
          }
        });
      });
    }
    return {
      numberOfUsages: counter,
      color: numberOfUsages > 0 ? "#F31630" : "#E0E0E0",
    };
  }
}

export function dmsExtractor(dataIn) {
  if (dataIn === undefined) {
    return {
      numberOfDocuments: "  ",
      color: "#389EFD",
    };
  } else {
    const landparcel = dataIn;
    const numberOfDocuments = landparcel?.dms_urlArrayRelationShip?.length || 0;
    return {
      numberOfDocuments,
      color: numberOfDocuments > 0 ? "#180E53" : "#E0E0E0",
    };
  }
}

export function rebeExtractor(dataIn) {
  if (dataIn === undefined) {
    return {
      numberOfRights: "  ",
      color: "#389EFD",
    };
  } else {
    const rebe = dataIn;
    const numberOfRights = rebe.length || 0;
    return {
      numberOfRights,
      color: numberOfRights > 0 ? "#180E53" : "#E0E0E0",
    };
  }
}
