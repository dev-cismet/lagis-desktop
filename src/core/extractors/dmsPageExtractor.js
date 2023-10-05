export function dmsPageExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const dms = dataIn?.dms_urlArrayRelationShip || [];
    if (dms.length > 0) {
      const data = dms.map((d) => {
        const server = "http://dokumente.s10222.wuppertal-intra.de";
        const fileName = d.url.object_name;
        const urlBase = d.url.url_base.path;
        const pathParts = urlBase.split("\\");
        pathParts[1] = pathParts[1].toLowerCase();
        const modifiedPath = pathParts.join("/");
        const finalPath = `${server}${modifiedPath}${fileName.replace(
          /\s/g,
          "%20"
        )}`;
        return {
          id: d.id,
          name: d.name,
          beschreibung: d.beschreibung === null ? "" : d.beschreibung,
          file: d.url.object_name,
          vorschau: finalPath,
        };
      });

      return data;
    }

    return [];
  }
}
