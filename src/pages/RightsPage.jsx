import React from "react";
import Map from "../components/commons/Map";
import RightsAndEncumbrances from "../components/rights/RightsAndEncumbrances";

const RightsPage = ({ width = "100%", height = "100%", inStory = false }) => {
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
    <div style={{ ...storyStyle }} className="flex flex-col h-[100%] gap-4">
      <div className="flex-1 h-1/2">
        <Map width={"100%"} height={"100%"} />
      </div>
      <div children className="flex-1 h-1/2">
        <RightsAndEncumbrances />
      </div>
    </div>
  );
};

export default RightsPage;
