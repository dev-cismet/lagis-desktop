import React from "react";
import { Col, Row } from "antd";
import Contracts from "../components/operations/Contracts";
import ContractData from "../components/operations/ContractData";
import CrossReferences from "../components/operations/CrossReferences";
import NoteOperations from "../components/operations/NoteOperations";

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
      background: "gray",
      padding: "4px",
    };
  }
  const firstRowStyle = { width: "100%", height: height * 0.47 - 20 };
  const secondRowStyle = { width: "100%", height: height * 0.53 - 20 };
  const gutterStyle = [16, 16];
  const marginBottomStyle = { marginBottom: "20px" };
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
        style={{
          // border: "2px solid blue",
          ...marginBottomStyle,
        }}
      >
        <Col span={24}>
          <Contracts height={firstRowStyle.height} />
        </Col>
      </Row>
      <Row
        gutter={gutterStyle}
        style={{
          // border: "2px solid red",
          ...marginBottomStyle,
        }}
      >
        <Col span={12}>
          <ContractData />
        </Col>
        <Col span={12}>
          <CrossReferences height={secondRowStyle.height} />
        </Col>
      </Row>
      <Row
        gutter={gutterStyle}
        style={{
          // border: "2px solid red",
          ...marginBottomStyle,
        }}
      >
        <Col span={24}>
          <NoteOperations />
        </Col>
      </Row>
    </div>
  );
};

export default OperationsPage;
