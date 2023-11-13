// import dayjs from "dayjs";
// import weekday from "dayjs/plugin/weekday";
// import localeData from "dayjs/plugin/localeData";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// dayjs.extend(weekday);
// dayjs.extend(localeData);
// dayjs.extend(customParseFormat);

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
      //   console.log("ssss!!!!", fstckString, ifHistorical, iconType);

      return {
        id: c.id,
        content: fstckString,
        searchParamsObj,
        iconType: iconType === "städtisch" ? "bank" : "block",
        ifHistorical: ifHistorical ? true : false,
      };
    });

    return updatedArr;
  }
}
