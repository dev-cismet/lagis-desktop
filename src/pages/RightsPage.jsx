import React from "react";
import Map from "../components/commons/Map";
import { useSelector } from "react-redux";
import RightsAndEncumbrances from "../components/rights/RightsAndEncumbrances";
import { getAlkisLandparcel, getRebe } from "../store/slices/lagis";
import { rebePageExtractor } from "../core/extractors/rebePageExtractor";
const RightsPage = ({ width = "100%", height = "100%", inStory = false }) => {
  const alkisLandparcel = useSelector(getAlkisLandparcel);
  const rebe = useSelector(getRebe);
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
      backgroundColor: "#F1F1F1",
    };
  }
  return (
    <div style={{ ...storyStyle }} className="h-[100%]">
      <div className="h-1/2 mb-4">
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
      <div className="h-[calc(50%-2rem)]">
        <RightsAndEncumbrances dataIn={rebe} extractor={rebePageExtractor} />
      </div>
    </div>
  );
};

export default RightsPage;
