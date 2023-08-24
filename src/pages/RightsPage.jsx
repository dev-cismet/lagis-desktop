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
    <div style={{ ...storyStyle }} className="h-[100%]">
      <div className="h-1/2 mb-4">
        <Map width={"99%"} height={"100%"} />
      </div>
      <div className="h-[calc(50%-2em)]">
        <RightsAndEncumbrances />
      </div>
    </div>
  );
};

export default RightsPage;
