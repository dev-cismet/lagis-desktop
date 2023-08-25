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
  return (
    <div
      style={{
        ...storyStyle,
      }}
      className="h-[90%]"
    >
      <div className="flex gap-2 h-full">
        <div className="flex flex-wrap gap-3 w-full h-full">
          <Offices />
          <Rent />
          <Rights />
          <Usage />
          <Operations />
          <History />
          <Transaction />
          <DMS />
        </div>
        <div className="w-10/12 h-full">
          <Map width={"100%"} height={height} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
