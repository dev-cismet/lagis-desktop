import React from "react";
import Map from "../components/commons/Map";
import Agencies from "../components/offices/Agencies";
import AdditionalRole from "../components/offices/AdditionalRole";
import Streetfronts from "../components/offices/Streetfronts";
import Notes from "../components/offices/Notes";
import { useSelector } from "react-redux";
import { getLandparcel, getAlkisLandparcel } from "../store/slices/lagis";
import { noteExtractor } from "../core/extractors/officesPageExtractor";
const Offices = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
      backgroundColor: "#F1F1F1",
    };
  }
  const landparcel = useSelector(getLandparcel);
  const alkisLandparcel = useSelector(getAlkisLandparcel);
  // const streetfronts = useSelector(getStreetfronts);
  // const additionalRoll = useSelector(getAdditionalRoll);
  // const tableFormat = additionalRoll
  //   ? additionalRoll.map((r) => ({
  //       key: nanoid(),
  //       agency: `${additionalRoll[0].verwaltende_dienststelle.ressort.abkuerzung}.${additionalRoll[0].verwaltende_dienststelle.abkuerzung_abteilung}`,
  //       rolle: `${additionalRoll[0].zusatz_rolle_art.name}`,
  //     }))
  //   : [];
  // const additionalRoleColor = getColorFromCode(
  //   additionalRoll[0]?.verwaltende_dienststelle.farbeArrayRelationShip[0]
  //     .rgb_farbwert
  // );
  // const columns = [
  //   {
  //     title: "Dienststelle",
  //     dataIndex: "agency",
  //     render: (title) => (
  //       <div className="flex items-center">
  //         <span
  //           style={{
  //             width: "9px",
  //             height: "11px",
  //             marginRight: "6px",
  //             backgroundColor: additionalRoleColor,
  //           }}
  //         ></span>
  //         <span>{title}</span>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Rolle",
  //     dataIndex: "rolle",
  //   },
  // ];
  return (
    <div
      style={{ ...storyStyle, height }}
      className="offices-page flex flex-col gap-4"
    >
      <div className="flex gap-3 h-[60%]">
        <div className="w-2/5">
          <Agencies />
        </div>
        <div className="w-3/5">
          <Map
            width={"100%"}
            height={"100%"}
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
      <div className="flex gap-3 h-[calc(40%-20px)]">
        <div className="flex-1">
          <AdditionalRole />
        </div>
        <div className="flex-1">
          <Streetfronts />
        </div>
        <div className="flex-1">
          <Notes dataIn={landparcel} extractor={noteExtractor} />
        </div>
      </div>
    </div>
  );
};

export default Offices;
