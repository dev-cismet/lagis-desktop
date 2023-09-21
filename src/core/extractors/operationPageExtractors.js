import { nanoid } from "@reduxjs/toolkit";

export function contractsBlockExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const landparcel = dataIn;
    const contracts = landparcel.ar_vertraegeArray;
    if (contracts.length > 0) {
      const data = contracts.map((c) => ({
        id: nanoid(),
        vertragsart: c.vertrag.vertragsart.bezeichnung,
        nummer: c.vertrag.aktenzeichen,
        quadratmeterpreis: c.vertrag.quadratmeterpreis,
        kaufpreis: c.vertrag.gesamtpreis,
      }));
      console.log("ccc ext if end", data);
      return data;
    }
    return [];
  }
}
