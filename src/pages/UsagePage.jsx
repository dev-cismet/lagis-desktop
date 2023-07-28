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
  const rowStyle = { width: "100%", height: height * 0.5 - 24 };
  const gutterStyle = [16, 16];
  const marginBottomStyle = { marginBottom: "24px" };
  return (
    <div
      style={{
        ...storyStyle,
        width,
        height,
        backgroundColor: "#F1F1F1",
      }}
    >
      <Row gutter={gutterStyle} style={{ height: "50%", ...marginBottomStyle }}>
        <Col span={24}>
          <UsageBlock />
        </Col>
      </Row>
      <Row gutter={gutterStyle} style={{ height: "50%" }}>
        <Col span={24}>
          <NFKOverwie height={rowStyle.height} />
        </Col>
      </Row>
    </div>
  );
};

export default UsagePage;
