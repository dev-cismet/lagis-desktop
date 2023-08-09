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
  const firstRow = { height: height * 0.5 - 16 };
  const secondRow = { height: height * 0.32 };
  const gutterStyle = [12, 12];
  const marginBottomStyle = { marginBottom: "16px" };
  return (
    <div style={{ ...storyStyle }}>
      <Row
        gutter={gutterStyle}
        style={{ height: firstRow.height, ...marginBottomStyle }}
      >
        <Col span={24}>
          <Map width={"100%"} height={firstRow.height} />
        </Col>
      </Row>
      <Row
        gutter={gutterStyle}
        style={{ height: secondRow.height, ...marginBottomStyle }}
      >
        <Col span={24}>
          <RightsAndEncumbrances />
        </Col>
      </Row>
    </div>
  );
};

export default RightsPage;
