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
      className="h-full w-full overflow-clip max-h[calc(100%-30px)]"
    >
      <div className="w-full h-[40%] bg-white mb-2">
        <Map width={"99%"} height={"100%"} />
      </div>

      <div className="h-[calc(60%-15px)]">
        <RentBlock />
      </div>
    </div>
  );
};

export default RentAndLease;
