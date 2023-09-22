import { nanoid } from "@reduxjs/toolkit";

export function usageBlockExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const landparcel = dataIn;
    const usage = landparcel.nutzungArrayRelationShip;
    console.log("usage extractor", landparcel);

    const currentUsage = [];
    let usageId;
    let buchungArray;
    let buchungs;
    let currentIdxInBuchungArray;
    usage.forEach((element) => {
      element.nutzung_buchungArrayRelationShip.forEach((item, idx) => {
        if (item.gueltig_bis === null) {
          currentUsage.push(item);
          usageId = element.id;
          buchungArray = element.nutzung_buchungArrayRelationShip;
          buchungs = element.nutzung_buchungArrayRelationShip.length;
          currentIdxInBuchungArray = idx;
        }
      });
    });
    if (currentUsage.length > 0) {
      const data = currentUsage.map((u) => {
        return {
          id: usageId,
          nutzung: usageId,
          buchungs,
          anlageklasse: u.anlageklasse.bezeichnung,
          nutzungsart: u.nutzungsart.bezeichnung,
          bezeichnung: u.nutzungsart.schluessel,
          fläche: u.flaeche,
          preis: u.quadratmeterpreis,
          gesamtpreis:
            u.quadratmeterpreis * u.flaeche -
            calculateStilleReserve(
              buchungArray,
              currentIdxInBuchungArray,
              u.quadratmeterpreis * u.flaeche
            ),
          stille: calculateStilleReserve(
            buchungArray,
            currentIdxInBuchungArray,
            u.quadratmeterpreis * u.flaeche
          ),
          buchwert: u.ist_buchwert,
          bemerkung: u.bemerkung ? u.bemerkung : "",
        };
      });

      return data.reverse();
    }

    return [];
  }
}

function calculateStilleReserve(buchungArray, positionInArray, gesamtpreis) {
  let lastIstBuchwer;
  buchungArray.forEach((item, idx) => {
    if (item.ist_buchwert && idx < positionInArray) {
      lastIstBuchwer = item;
    }
  });
  let res = 0;
  if (lastIstBuchwer?.quadratmeterpreis && lastIstBuchwer?.flaeche) {
    res =
      gesamtpreis - lastIstBuchwer.quadratmeterpreis * lastIstBuchwer.flaeche;
  } else {
    res = 0;
  }
  console.log("usage extractor", res);
  return res;
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
