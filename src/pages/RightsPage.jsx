import React from "react";
import Map from "../components/commons/Map";
import { Col, Row } from "antd";
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
  const firstRowStyle = { width: "100%", height: height * 0.5 - 12 };
  const gutterStyle = [12, 12];
  const marginBottomStyle = { marginBottom: "12px" };
  return (
    <div style={{ ...storyStyle, width, height }}>
      <Row gutter={gutterStyle} style={{ height: "50%", ...marginBottomStyle }}>
        <Col span={24}>
          <Map width={"100%"} height={firstRowStyle.height} />
        </Col>
      </Row>

      <Row gutter={gutterStyle} style={{ height: "50%" }}>
        <Col span={24}>
          <RightsAndEncumbrances />
        </Col>
      </Row>
    </div>
  );
};

export default RightsPage;
