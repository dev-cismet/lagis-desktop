import React from "react";
import Map from "../components/commons/Map";
import { Col, Row } from "antd";
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
      <div className="flex gap-3 h-4/6">
        <div className="flex-auto w-2/5">
          <Agencies />
        </div>
        <div className="flex-auto w-3/5">
          <Map width={"100%"} height={"100%"} />
        </div>
      </div>
      <div className="flex gap-3 h-2/6">
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
