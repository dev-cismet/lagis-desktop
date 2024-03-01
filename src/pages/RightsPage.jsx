import React, { useState, useEffect } from "react";
import Map from "../components/commons/Map";
import { useSelector } from "react-redux";
import RightsAndEncumbrances from "../components/rights/RightsAndEncumbrances";
import {
  getAlkisLandparcel,
  getGeometry,
  getLandparcel,
  getRebe,
} from "../store/slices/lagis";
import {
  rebePageExtractor,
  mapRebeExtractor,
} from "../core/extractors/rebePageExtractor";
import { mapExtractor } from "../core/extractors/commonExtractors";
const RightsPage = ({ width = "100%", height = "100%", inStory = false }) => {
  const alkisLandparcel = useSelector(getAlkisLandparcel);
  const landparcel = useSelector(getLandparcel);
  const geometry = useSelector(getGeometry);
  const rebe = useSelector(getRebe);
  const [extraGeom, setExtraGeom] = useState(null);
  const [selectedTableRowId, setSelectedTableRowId] = useState(null);
  const [selectedTableIdByMap, setSelectedTableIdByMap] = useState(null);

  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
      backgroundColor: "#F1F1F1",
    };
  }

  const mapClickHandler = (feature) => {
    const { tableId } = feature;
    setSelectedTableIdByMap(tableId);
  };

  useEffect(() => {
    if (extraGeom) {
      setExtraGeom(null);
    }
  }, [landparcel]);

  return (
    <div style={{ ...storyStyle }} className="h-full w-full">
      <div className="h-[calc(50%-16px)]" style={{ marginBottom: "16px" }}>
        {extraGeom ? (
          <Map
            width={width}
            height={height}
            dataIn={{
              landparcel,
              geometry: geometry,
              extraGeom: extraGeom,
              selectedTableRowId,
              inspectMode: true,
            }}
            extractor={mapRebeExtractor}
            onClickHandler={mapClickHandler}
            page="rebe"
          />
        ) : (
          <Map
            width={width}
            height={height}
            dataIn={{ landparcel, geometry }}
            extractor={mapExtractor}
            page="rebe"
          />
        )}
      </div>
      <div className="h-[calc(50%-4px)]">
        <RightsAndEncumbrances
          dataIn={rebe}
          extractor={rebePageExtractor}
          setExtraGeom={setExtraGeom}
          setSelectedTableRowId={setSelectedTableRowId}
          selectedTableRowId={selectedTableRowId}
          selectedTableIdByMap={selectedTableIdByMap}
        />
      </div>
    </div>
  );
};

export default RightsPage;
