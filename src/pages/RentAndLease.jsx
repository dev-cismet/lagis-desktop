import React from "react";
import Map from "../components/commons/Map";
import { Col, Row } from "antd";
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
  const firstRowStyle = { width: "100%", height: height * 0.4 - 12 };
  const gutterStyle = [0, 0];
  const marginBottomStyle = { marginBottom: "16px" };
  return (
    <div
      style={{
        ...storyStyle,
        width,
        height,
        backgroundColor: "#F1F1F1",
      }}
    >
      <Row
        gutter={gutterStyle}
        style={{ minHeight: "200px", ...marginBottomStyle }}
      >
        <Col span={24}>
          <Map width={"100%"} height={"100%"} />
        </Col>
      </Row>

      <Row gutter={gutterStyle}>
        <Col span={24}>
          <RentBlock />
        </Col>
      </Row>
    </div>
  );
};

export default RentAndLease;
