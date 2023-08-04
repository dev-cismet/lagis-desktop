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
  const gutterStyle = [12, 12];
  const marginBottomStyle = { marginBottom: "16px" };
  return (
    <div style={{ ...storyStyle, width, height }}>
      <Row gutter={gutterStyle} style={{ ...marginBottomStyle }}>
        <Col span={24}>
          <Map width={"100%"} height={"250px"} />
        </Col>
      </Row>

      <Row gutter={gutterStyle}>
        <Col span={24}>
          <RightsAndEncumbrances />
        </Col>
      </Row>
    </div>
  );
};

export default RightsPage;
