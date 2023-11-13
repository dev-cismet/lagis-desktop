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
      return {
        id: c.id,
        content: fstckString,
        searchParamsObj,
      };
    });

    return updatedArr;
  }
}

// const lansParcelParamsArray = landParcelString.split(" ");
// const lansParcelParamsObj = {};
// lansParcelParamsObj.gem = lansParcelParamsArray[0];
// lansParcelParamsObj.flur = lansParcelParamsArray[1];
// lansParcelParamsObj.fstck = lansParcelParamsArray[2].replace(/\//g, "-");
// setUrlParams(lansParcelParamsObj);
