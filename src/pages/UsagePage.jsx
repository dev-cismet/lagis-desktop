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
  const gutterStyle = [16, 16];
  return (
    <div
      style={{
        ...storyStyle,
        width: "100%",
        height: "100%",
        backgroundColor: "#F1F1F1",
      }}
      className="flex flex-col gap-4"
    >
      <Row gutter={gutterStyle}>
        <Col span={24}>
          <UsageBlock />
        </Col>
      </Row>
      <Row gutter={gutterStyle} className="flex-grow">
        <Col span={24}>
          <NFKOverwie />
        </Col>
      </Row>
    </div>
  );
};

export default UsagePage;
