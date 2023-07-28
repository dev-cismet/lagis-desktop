import React from "react";
import Map from "../components/commons/Map";
import { Col, Row } from "antd";
import Agencies from "../components/offices/Agencies";
import AdditionalRole from "../components/offices/AdditionalRole";
import Streetfronts from "../components/offices/Streetfronts";
import Notes from "../components/offices/Notes";
const Offices = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
      backgroundColor: "#F1F1F1",
    };
  }
  const firstRowStyle = { width: "100%", height: height * 0.6 - 8 };
  const secondRowStyle = { width: "100%", height: height * 0.4 - 8 };
  const gutterStyle = [16, 16];
  const marginBottomStyle = { marginBottom: "8px" };

  return (
    <div style={{ ...storyStyle, width, height }}>
      <Row gutter={gutterStyle} style={{ height: "60%", ...marginBottomStyle }}>
        <Col span={8} flex="auto">
          <Agencies />
        </Col>
        <Col span={16}>
          <Map width={"100%"} height={firstRowStyle.height} />
        </Col>
      </Row>

      <Row gutter={gutterStyle} style={{ height: "40%" }}>
        <Col span={8}>
          <AdditionalRole />
        </Col>
        <Col span={8}>
          <Streetfronts />
        </Col>
        <Col span={8}>
          <Notes height={secondRowStyle.height} />
        </Col>
      </Row>
    </div>
  );
};

export default Offices;
