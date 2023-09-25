export function dmsPageExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const dms = dataIn?.dms_urlArrayRelationShip || [];
    if (dms.length > 0) {
      const data = dms.map((d) => {
        //href="//sw0040/Lagerbuch/Inhaltsverzeichnis_LB/Barmen/002.TIF"
        const stringWithForwardSlashes = d.url.url_base.path
          .replace(/\\/g, "/")
          .replace(/\s/g, "_");
        console.log("dms extractor", d);
        const server = d.url.url_base.server;
        return {
          id: d.id,
          name: d.name,
          beschreibung: d.beschreibung === null ? "" : d.beschreibung,
          file: d.url.object_name,
          vorschau: `//${server}${stringWithForwardSlashes}${d.url.object_name}`,
        };
      });

      return data;
    }

    return [];
  }
}
