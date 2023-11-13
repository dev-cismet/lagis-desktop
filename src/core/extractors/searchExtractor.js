export function searchContractExtractor(contractFlurstuckeArr) {
  if (contractFlurstuckeArr === undefined) {
    return [];
  } else {
    const updatedArr = contractFlurstuckeArr.map((c) => {
      const fstck = c.flurstueck_schluessel;
      const gemarkung = fstck.gemarkung.bezeichnung;
      const flur = fstck.flur;
      const nennerZaehler = `${fstck.flurstueck_zaehler}-${fstck.flurstueck_nenner}`;
      const fstckString = `${gemarkung} ${flur} ${fstck.flurstueck_zaehler}/${fstck.flurstueck_nenner}`;
      const searchParamsObj = {
        gem: gemarkung,
        flur: flur,
        fstck: nennerZaehler,
      };
      const iconType = fstck.flurstueck_art.bezeichnung;
      const ifHistorical = fstck.gueltig_bis;
      return {
        id: c.id,
        content: fstckString,
        searchParamsObj,
        gemarkung: gemarkung,
        flur: flur,
        iconType: iconType === "städtisch" ? "bank" : "block",
        ifHistorical: ifHistorical ? true : false,
      };
    });

    updatedArr.sort((a, b) => {
      // First, sort by gemarkung alphabetically
      const gemarkungA = a.gemarkung.toUpperCase();
      const gemarkungB = b.gemarkung.toUpperCase();
      if (gemarkungA < gemarkungB) {
        return -1;
      }
      if (gemarkungA > gemarkungB) {
        return 1;
      }
      const flurA = parseInt(a.flur, 10);
      const flurB = parseInt(b.flur, 10);
      return flurA - flurB;
    });

    return updatedArr;
  }
}
