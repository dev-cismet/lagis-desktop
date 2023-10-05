import React from "react";
import Map from "../components/commons/Map";
import { useSelector } from "react-redux";
import RightsAndEncumbrances from "../components/rights/RightsAndEncumbrances";
import {
  getAlkisLandparcel,
  getGeometry,
  getLandparcel,
  getRebe,
} from "../store/slices/lagis";
import { rebePageExtractor } from "../core/extractors/rebePageExtractor";
import { mapExtractor } from "../core/extractors/commonExtractors";
const RightsPage = ({ width = "100%", height = "100%", inStory = false }) => {
  const alkisLandparcel = useSelector(getAlkisLandparcel);
  const landparcel = useSelector(getLandparcel);
  const geometry = useSelector(getGeometry);
  const rebe = useSelector(getRebe);
  console.log("geometry", geometry);

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
          dataIn={{ landparcel, geometry }}
          extractor={mapExtractor}
        />
      </div>
      <div className="h-[calc(50%-2rem)]">
        <RightsAndEncumbrances dataIn={rebe} extractor={rebePageExtractor} />
      </div>
    </div>
  );
};

export default RightsPage;
