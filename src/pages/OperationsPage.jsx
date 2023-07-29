import React from "react";
import { Col, Row } from "antd";
import MockCard from "../components/mock/MockCard";

const OperationsPage = ({
  width = "100%",
  height = "100%",
  inStory = false,
}) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "4px",
    };
  }
  const rowStyle = { width: "100%", height: height };
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
          <MockCard title="Vorgänge" style={{ height: rowStyle.height }} />
        </Col>
      </Row>
    </div>
  );
};

export default OperationsPage;
