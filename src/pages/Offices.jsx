import React from "react";
import Map from "../components/commons/Map";
import Agencies from "../components/offices/Agencies";
import AdditionalRole from "../components/offices/AdditionalRole";
import Streetfronts from "../components/offices/Streetfronts";
import Notes from "../components/offices/Notes";
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
          <Map width={"100%"} height={"100%"} />
        </div>
      </div>
      <div className="flex gap-3 h-[calc(40%-20px)]">
        <dib className="flex-1">
          <AdditionalRole />
        </dib>
        <div className="flex-1">
          <Streetfronts />
        </div>
        <div className="flex-1">
          <Notes />
        </div>
      </div>
    </div>
  );
};

export default Offices;
