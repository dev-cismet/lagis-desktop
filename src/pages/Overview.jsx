import React from "react";
import Map from "../components/commons/Map";
import Offices from "../components/overview/Offices";
import Rent from "../components/overview/Rent";
import Rights from "../components/overview/Rights";
import Usage from "../components/overview/Usage";
import Operations from "../components/overview/Operations";
import History from "../components/overview/History";
import Transaction from "../components/overview/Transaction";
import DMS from "../components/overview/DMS";
import { fetchGraphQL } from "../core/graphql";
import { useSelector, useDispatch } from "react-redux";
import { getJWT } from "../store/slices/auth";
import { Spin } from "antd";
import {
  storeLandParcels,
  storeLandmarks,
  getLandParcels,
  getLandmarks,
  fetchLandParcelsStart,
  fetchLandParcelsFailure,
  fetchLandLandmarksFailure,
  getLandmarksLoading,
} from "../store/slices/landParcels";
import { useEffect } from "react";
import queries from "../core/queries/online";
import { getLandparcel } from "../store/slices/lagisLandparcel";
import { rentExtractor } from "../core/extractors/overviewExtractors";
import { officesExtractor } from "../core/extractors/overviewExtractors";
const Overview = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
      backgroundColor: "#F1F1F1",
    };
  }
  const dispatch = useDispatch();
  const jwt = useSelector(getJWT);
  const { landmarks } = useSelector(getLandmarks);
  const { landParcels } = useSelector(getLandParcels);
  const loading = useSelector(getLandmarksLoading);
  const getflurstuecke = async () => {
    if (!landParcels && jwt) {
      dispatch(fetchLandParcelsStart());
      const result = await fetchGraphQL(queries.flurstuecke, {}, jwt);
      console.log("LandParcels start", result);
      if (result.data?.alkis_flurstueck) {
        dispatch(storeLandParcels(result.data.alkis_flurstueck));
        console.log("LandParcels success");
      } else {
        console.log("LandParcels error");
        dispatch(fetchLandParcelsFailure(result.status));
      }
    }
  };
  const getGemarkungen = async () => {
    if (!landmarks && jwt) {
      dispatch(fetchLandParcelsStart());
      const result = await fetchGraphQL(queries.gemarkung, {}, jwt);
      if (result.data?.gemarkung) {
        dispatch(storeLandmarks(result.data.gemarkung));
      } else {
        dispatch(fetchLandLandmarksFailure("error message"));
      }
    }
  };
  useEffect(() => {
    getflurstuecke();
    getGemarkungen();
  }, []);
  if (loading) {
    return <Spin />;
  }

  const landparcel = useSelector(getLandparcel);

  return (
    <div
      style={{
        ...storyStyle,
      }}
      className="h-full overflow-clip max-h[calc(100%-30px)]"
    >
      <div className="flex gap-2 w-full  h-[calc(100%-4px)]">
        <div className="w-1/2 gap-2 overflow-auto">
          <div className="grid grid-cols-2 gap-2 h-[calc(100%-4px)]">
            <Offices dataIn={landparcel} extractor={officesExtractor} />
            <Rent dataIn={landparcel} extractor={rentExtractor} />
            <Rights dataIn={landparcel} />
            <Usage dataIn={landparcel} />
            <Operations dataIn={landparcel} />
            <History dataIn={landparcel} />
            <Transaction dataIn={landparcel} />
            <DMS />
          </div>
        </div>
        <div className="w-1/2 h-[calc(100%-4px)]">
          <Map width={"100%"} height={height} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
