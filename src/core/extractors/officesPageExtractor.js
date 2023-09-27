import { getColorFromCode } from "../tools/helper";
import { getArea25832 } from "../tools/mappingTools";
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
          id: lastOffice.id,
          agency: title,
          area: Math.round(area),
          color: getColorFromCode(color),
        });
        checkTitleArray.push(currentTitle);
      }
    });
    return nameGeomColorData.length > 0 ? nameGeomColorData : [];
  }
}
