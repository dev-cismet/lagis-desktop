import React from "react";
import { Col, Row } from "antd";
import UsageBlock from "../components/usage/UsageBlock";
import NFKOverwie from "../components/usage/NFKOverwie";

const UsagePage = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "4px",
    };
  }
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex-1">
        <UsageBlock />
      </div>
      <div className="flex-1">
        <NFKOverwie />
      </div>
    </div>
  );
};

export default UsagePage;
