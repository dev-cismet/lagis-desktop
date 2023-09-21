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
    console.log("usage", currentUsage);
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
          gesamtpreis: u.quadratmeterpreis * u.flaeche - u.quadratmeterpreis,
          stille: u.quadratmeterpreis,
          buchwert: u.ist_buchwert ? "xxx true" : "xxx false",
          bemerkung: u.bemerkung ? u.bemerkung : "",
        };
      });

      return data;
    }

    return [];
  }
}
