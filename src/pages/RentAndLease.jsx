import React from "react";
import Map from "../components/commons/Map";
import RentBlock from "../components/rent/RentBlock";
import { useSelector } from "react-redux";
import { mipaPageExtractor } from "../core/extractors/mipaPageExtractor";
import { getAlkisLandparcel, getMipa } from "../store/slices/lagis";
const RentAndLease = ({ width = "100%", height = "100%", inStory = false }) => {
  const mipa = useSelector(getMipa);
  const alkisLandparcel = useSelector(getAlkisLandparcel);
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "4px",
    };
  }
  return (
    <div
      style={{
        ...storyStyle,
        backgroundColor: "#F1F1F1",
      }}
      className="h-full w-full overflow-clip max-h[calc(100%-30px)]"
    >
      <div className="w-full h-[40%] bg-white mb-2">
        <Map
          width={"100%"}
          height={height}
          dataIn={alkisLandparcel}
          extractor={(dataIn) => {
            if (dataIn) {
              const alkisLandparcel = dataIn;
              const feature = {
                type: "Feature",
                featureType: "landparcel",
                id: "landparcel." + alkisLandparcel.alkis_id,
                geometry: alkisLandparcel.geometrie,
                crs: alkisLandparcel.geometrie.crs,
                properties: {
                  id: alkisLandparcel.alkis_id,
                },
              };

              return {
                homeCenter: [51.272570027476256, 7.19963690266013],
                homeZoom: 16,
                featureCollection: [feature],
                styler: (feature) => {
                  const style = {
                    color: "#005F6B",
                    weight: 1,
                    opacity: 0.6,
                    fillColor: "#26ADE4",
                    fillOpacity: 0.6,
                    className: "landparcek-" + feature.properties.id,
                  };
                  return style;
                },
              };
            } else {
              return {
                homeCenter: [51.272570027476256, 7.19963690266013],
                homeZoom: 13,
                featureCollection: [],
              };
            }
          }}
        />
      </div>

      <div className="h-[calc(60%-15px)]">
        <RentBlock dataIn={mipa} extractor={mipaPageExtractor} />
      </div>
    </div>
  );
};

export default RentAndLease;
