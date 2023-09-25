import React, { useState } from "react";
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
import {
  getAlkisLandparcel,
  getLandparcel,
  getMipa,
  getRebe,
} from "../store/slices/lagis";
import {
  dmsExtractor,
  mipaExtractor,
  operationExtractor,
  rebeExtractor,
  transactionExtractor,
  usageExtractor,
} from "../core/extractors/overviewExtractors";
import { officesExtractor } from "../core/extractors/overviewExtractors";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [urlParams, setUrlParams] = useSearchParams();
  const [parametersForLink, setParametersForLink] = useState();
  const navigate = useNavigate();
  const { landmarks } = useSelector(getLandmarks);
  const { landParcels } = useSelector(getLandParcels);
  const mipa = useSelector(getMipa);
  const rebe = useSelector(getRebe);
  const loading = useSelector(getLandmarksLoading);
  const getflurstuecke = async () => {
    if (!landParcels && jwt) {
      dispatch(fetchLandParcelsStart());
      const result = await fetchGraphQL(queries.flurstuecke, {}, jwt);
      if (result.data?.alkis_flurstueck) {
        dispatch(storeLandParcels(result.data.alkis_flurstueck));
      } else {
        dispatch(fetchLandParcelsFailure(result.status));
      }
    }
  };
  const getGemarkungen = async () => {
    if (!landmarks && jwt) {
      dispatch(fetchLandParcelsStart());
      const result = await fetchGraphQL(queries.gemarkung, {}, jwt);
      console.log("get gemarkungen", result);
      if (result.status === 401) {
        navigate("/login");
      }
      if (result.data?.gemarkung) {
        dispatch(storeLandmarks(result.data.gemarkung));
      } else {
        dispatch(fetchLandLandmarksFailure("error message"));
      }
    }
  };
  // if (loading) {
  //   return <Spin />;
  // }
  useEffect(() => {
    getflurstuecke();
    getGemarkungen();
  }, []);
  useEffect(() => {
    const fromUrl = {
      gem: urlParams.get("gem") || undefined,
      flur: urlParams.get("flur") || undefined,
      fstck: urlParams.get("fstck") || undefined,
    };
    setParametersForLink(fromUrl);
  }, [urlParams]);

  const landparcel = useSelector(getLandparcel);
  const alkisLandparcel = useSelector(getAlkisLandparcel);
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
            <Offices
              dataIn={landparcel}
              extractor={officesExtractor}
              parametersForLink={parametersForLink}
            />
            <Rent
              dataIn={mipa}
              extractor={mipaExtractor}
              parametersForLink={parametersForLink}
            />
            <Rights
              dataIn={rebe}
              extractor={rebeExtractor}
              parametersForLink={parametersForLink}
            />
            <Usage
              dataIn={landparcel}
              extractor={usageExtractor}
              parametersForLink={parametersForLink}
            />
            <Operations
              dataIn={landparcel}
              extractor={operationExtractor}
              parametersForLink={parametersForLink}
            />
            <History dataIn={landparcel} />
            <Transaction
              dataIn={landparcel}
              extractor={transactionExtractor}
              parametersForLink={parametersForLink}
            />
            <DMS
              dataIn={landparcel}
              extractor={dmsExtractor}
              parametersForLink={parametersForLink}
            />
          </div>
        </div>
        <div className="w-1/2 h-[calc(100%-4px)]">
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
      </div>
    </div>
  );
};

export default Overview;
