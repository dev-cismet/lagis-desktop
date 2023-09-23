import { nanoid } from "@reduxjs/toolkit";

export function usageBlockExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const landparcel = dataIn;
    const usage = landparcel.nutzungArrayRelationShip;
    console.log("usage extractor", landparcel);

    const currentUsage = [];
    usage.forEach((element) => {
      element.nutzung_buchungArrayRelationShip.forEach((item, idx) => {
        let usageId;
        let buchungArray;
        let buchungs;
        let currentIdxInBuchungArray;
        let data = {};
        if (item.gueltig_bis === null) {
          usageId = element.id;
          buchungArray = element.nutzung_buchungArrayRelationShip;
          buchungs = element.nutzung_buchungArrayRelationShip.length;
          currentIdxInBuchungArray = idx;
          element.nutzung_buchungArrayRelationShip.forEach((u) => {
            data.id = usageId;
            data.nutzung = usageId;
            data.buchungs = buchungs;
            data.anlageklasse = u.anlageklasse.bezeichnung;
            data.nutzungsart = u.nutzungsart.bezeichnung;
            data.bezeichnung = u.nutzungsart.schluessel;
            data.fläche = u.flaeche;
            data.preis = u.quadratmeterpreis;
            (data.gesamtpreis =
              u.quadratmeterpreis * u.flaeche -
              calculateStilleReserve(
                buchungArray,
                currentIdxInBuchungArray,
                u.quadratmeterpreis * u.flaeche
              )),
              (data.stille = calculateStilleReserve(
                buchungArray,
                currentIdxInBuchungArray,
                u.quadratmeterpreis * u.flaeche
              ));
            data.buchwert = u.ist_buchwert;
            data.bemerkung = u.bemerkung ? u.bemerkung : "";
          });
          currentUsage.push(data);
        }
      });
    });

    return currentUsage;
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
    console.log("usage extractor", landparcel);

    const currentUsage = [];
    usage.forEach((element) => {
      element.nutzung_buchungArrayRelationShip.forEach((item, idx) => {
        let usageId;
        let buchungArray;
        let buchungs;
        let currentIdxInBuchungArray;
        let data = {};
        if (item.gueltig_bis === null) {
          usageId = element.id;
          buchungArray = element.nutzung_buchungArrayRelationShip;
          buchungs = element.nutzung_buchungArrayRelationShip.length;
          currentIdxInBuchungArray = idx;
          element.nutzung_buchungArrayRelationShip.forEach((u) => {
            data.id = usageId;
            // data.nutzung = usageId;
            // data.buchungs = buchungs;
            data.anlageklasse = u.anlageklasse.schluessel;
            // data.nutzungsart = u.nutzungsart.bezeichnung;
            // data.bezeichnung = u.nutzungsart.schluessel;
            // data.fläche = u.flaeche;
            // data.preis = u.quadratmeterpreis;
            (data.summe =
              u.quadratmeterpreis * u.flaeche -
              calculateStilleReserve(
                buchungArray,
                currentIdxInBuchungArray,
                u.quadratmeterpreis * u.flaeche
              )),
              (data.stille = calculateStilleReserve(
                buchungArray,
                currentIdxInBuchungArray,
                u.quadratmeterpreis * u.flaeche
              ));
            // data.buchwert = u.ist_buchwert;
            // data.bemerkung = u.bemerkung ? u.bemerkung : "";
          });
          currentUsage.push(data);
        }
      });
    });

    return currentUsage;
  }
}

// const data = currentUsage.map((u) => {
//   return {
//     id: nanoid(),
//     anlageklasse: u.anlageklasse.schluessel,
//     summe: u.quadratmeterpreis * u.flaeche,
//   };
// });
