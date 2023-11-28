import CismapLayer from "react-cismap/CismapLayer";

export const configuration = {
  abt9: {
    initialActive: false,
    title: "Abteilung 9",
    conf: {
      type: "wmts",
      url: "http://s10221.wuppertal-intra.de:8099/abt9_flst/services",
      layers: "abt9",
      version: "1.1.1",
      tileSize: 256,
      transparent: true,
      format: "image/png",
      pane: "additionalLayers1",
    },
  },
  baulastnachweis: {
    initialActive: false,
    title: "Baulastnachweis",
    conf: {
      type: "wmts",
      url: "http://s10221.wuppertal-intra.de:8056/baulasten/services",
      layers: "baul",
      version: "1.1.1",
      tileSize: 256,
      transparent: true,
      format: "image/png",
      pane: "additionalLayers1",
    },
  },
  stadtFstck: {
    initialActive: false,
    title: "Städt. Flurstücke",
    conf: {
      type: "wmts",
      url: "http://s10221.wuppertal-intra.de:7098/stadt-flurstuecke/services",
      layers: "stadt_flurst",
      version: "1.1.1",
      tileSize: 256,
      transparent: true,
      format: "image/png",
      pane: "additionalLayers1",
    },
  },
};

export default function AdditionalLayers({
  activeLayers = [],
  opacities = {},
}) {
  return (
    <>
      {activeLayers.map((layerKey, index) => {
        const layerConf = configuration[layerKey];
        if (layerConf) {
          return (
            <CismapLayer
              key={"Cismapayer." + index}
              //   if a key is set in the config it will overwrite the simpel key above
              {...{
                ...layerConf.conf,
                opacity: opacities[layerKey] || 1,
              }}
            ></CismapLayer>
          );
        }
      })}
    </>
  );
}
