import React, { useState } from "react";
import Map from "../components/commons/Map";
import RentBlock from "../components/rent/RentBlock";
import { useSelector } from "react-redux";
import {
  mapMipaExtractor,
  mipaPageExtractor,
} from "../core/extractors/mipaPageExtractor";
import {
  getAlkisLandparcel,
  getGeometry,
  getLandparcel,
  getMipa,
} from "../store/slices/lagis";
import { mapExtractor } from "../core/extractors/commonExtractors";
const RentAndLease = ({ width = "100%", height = "100%", inStory = false }) => {
  const mipa = useSelector(getMipa);
  const [extraRentsGeom, setExtraRentsGeom] = useState(null);
  const [selectedTableRowId, setSelectedTableRowId] = useState(null);

  const landparcel = useSelector(getLandparcel);
  const geometry = useSelector(getGeometry);
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
      className="h-full w-full max-h[calc(100%-30px)]"
    >
      <div className="w-full h-[40%] mb-3 lg:mb-4">
        {/* <Map
          width={width}
          height={height}
          dataIn={{ landparcel, geometry }}
          extractor={mapExtractor}
        /> */}
        <Map
          width={width}
          height={height}
          dataIn={{
            landparcel,
            geometry: geometry,
            extraGeom: extraRentsGeom,
            selectedTableRowId,
          }}
          extractor={mapMipaExtractor}
        />
      </div>

      <div className="h-[calc(60%-20px)]">
        <RentBlock
          dataIn={mipa}
          extractor={mipaPageExtractor}
          selectedTableRowId={selectedTableRowId}
          setSelectedTableRowId={setSelectedTableRowId}
          setExtraRentsGeom={setExtraRentsGeom}
        />
      </div>
    </div>
  );
};

export default RentAndLease;
