import React from "react";
import Map from "../components/commons/Map";
import RentBlock from "../components/rent/RentBlock";
const RentAndLease = ({ width = "100%", height = "100%", inStory = false }) => {
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
      className="flex flex-col h-full gap-3"
    >
      <div className="flex-1 h-2/5">
        <Map width={"100%"} height={"100%"} />
      </div>

      <div className="flex-1 h-3/5">
        <RentBlock />
      </div>
    </div>
  );
};

export default RentAndLease;
