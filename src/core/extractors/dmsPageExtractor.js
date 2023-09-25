import { nanoid } from "@reduxjs/toolkit";
// import dayjs from "dayjs";
// import weekday from "dayjs/plugin/weekday";
// import localeData from "dayjs/plugin/localeData";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// dayjs.extend(weekday);
// dayjs.extend(localeData);
// dayjs.extend(customParseFormat);
export function dmsPageExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const dms = dataIn?.dms_urlArrayRelationShip || [];
    if (dms.length > 0) {
      const data = dms.map((d) => {
        return {
          id: d.id,
          name: d.name,
          beschreibung: d.beschreibung === null ? "" : d.beschreibung,
          file: d.url.object_name,
          vorschau: d.path,
        };
      });

      return data;
    }

    return [];
  }
}
