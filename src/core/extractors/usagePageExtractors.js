import { nanoid } from "@reduxjs/toolkit";

export function usageBlockExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const landparcel = dataIn;
    const usage = landparcel.nutzungArrayRelationShip;
    const currentUsage = [];
    usage.forEach((element) => {
      element.nutzung_buchungArrayRelationShip.forEach((item) => {
        item.gueltig_bis === null && currentUsage.push(item);
      });
    });
    if (currentUsage.length > 0) {
      const data = currentUsage.map((u) => {
        return {
          id: nanoid(),
          nutzung: "xxx",
          buchungs: "1",
          anlageklasse: u.anlageklasse.bezeichnung,
          nutzungsart: u.nutzungsart.bezeichnung,
          bezeichnung: u.nutzungsart.schluessel,
          fläche: u.flaeche,
          preis: u.quadratmeterpreis,
          gesamtpreis: u.quadratmeterpreis * u.flaeche,
          stille: "xxx",
          buchwert: u.ist_buchwert,
          bemerkung: u.bemerkung ? u.bemerkung : "",
        };
      });

      return data.reverse();
    }

    return [];
  }
}

export function NFKOverwieExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const landparcel = dataIn;
    const usage = landparcel.nutzungArrayRelationShip;
    const currentUsage = [];
    usage.forEach((element) => {
      element.nutzung_buchungArrayRelationShip.forEach((item) => {
        item.gueltig_bis === null && currentUsage.push(item);
      });
    });
    if (currentUsage.length > 0) {
      const data = currentUsage.map((u) => {
        return {
          id: nanoid(),
          anlageklasse: u.anlageklasse.schluessel,
          summe: u.quadratmeterpreis * u.flaeche,
        };
      });

      return data.reverse();
    }

    return [];
  }
}
