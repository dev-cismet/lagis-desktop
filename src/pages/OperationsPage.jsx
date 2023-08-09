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
      border: "1px solid black",
      background: "gray",
      padding: "4px",
    };
  }
  const gutterStyle = [16, 16];
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
        style={{
          ...marginBottomStyle,
        }}
      >
        <Col span={16}>
          <Contracts />
        </Col>
        <Col span={8}>
          <NoteOperations />
        </Col>
      </Row>
      <Row gutter={gutterStyle}>
        <Col span={12}>
          <ContractData />
        </Col>
        <Col span={12}>
          <CrossReferences />
        </Col>
      </Row>
    </div>
  );
};

export default OperationsPage;
