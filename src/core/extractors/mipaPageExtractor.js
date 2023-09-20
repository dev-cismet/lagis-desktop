import { nanoid } from "@reduxjs/toolkit";

export function mipaPageExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const mipa = dataIn;
    if (mipa.length > 0) {
      const data = mipa.map((m) => {
        return {
          id: nanoid(),
          lage: m.lage,
          aktenzeichen: m.aktenzeichen,
          flaeche: m.flaeche,
          nutzung: m.nutzung ? m.nutzung : "xxx",
          vertragsbegin: m.vertragsbeginn,
          vertragsende: m.vertragsende ? m.vertragsende : "xxx",
          merkmale: m.ar_mipa_merkmaleArray ? m.ar_mipa_merkmaleArray : [],
          querverweise: "xxx",
          note: m.bemerkung ? m.bemerkung : "",
        };
      });

      return data;
    }

    return [];
  }
}
