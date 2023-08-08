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
  const firstRow = { height: height * 0.5 - 16 };
  const secondRow = { height: height * 0.42 - 16 };
  const gutterStyle = [16, 16];
  const marginBottomStyle = { marginBottom: "16px" };
  console.log("Offices", height);
  return (
    <div style={{ ...storyStyle, height: "100%" }} className="offices-page">
      <Row
        gutter={gutterStyle}
        style={{ height: firstRow.height, ...marginBottomStyle }}
      >
        <Col span={8} flex="auto">
          <Agencies />
        </Col>
        <Col span={16}>
          <Map width={"100%"} height={firstRow.height} />
        </Col>
      </Row>

      <Row gutter={gutterStyle} style={{ height: secondRow.height }}>
        <Col span={8}>
          <AdditionalRole />
        </Col>
        <Col span={8}>
          <Streetfronts />
        </Col>
        <Col span={8}>
          <Notes />
        </Col>
      </Row>
    </div>
  );
};

export default Offices;
