export function dmsPageExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const dms = dataIn?.dms_urlArrayRelationShip || [];
    if (dms.length > 0) {
      console.log("dms extractor", dms);
      const data = dms.map((d) => {
        return {
          id: d.id,
          name: d.name,
          beschreibung: d.beschreibung === null ? "" : d.beschreibung,
          file: d.url.object_name,
          vorschau: d.url,
        };
      });

      return data;
    }

    return [];
  }
}
