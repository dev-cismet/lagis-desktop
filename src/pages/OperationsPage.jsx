import React from "react";
import { Col, Row } from "antd";
import Contracts from "../components/operations/Contracts";
import ContractData from "../components/operations/ContractData";
import CrossReferences from "../components/operations/CrossReferences";
import NoteOperations from "../components/operations/NoteOperations";
import { useState } from "react";
const mockExtractor = (input) => {
  return [
    {
      key: 1,
      vertragsart: "text 1",
      nummer: "Nummer 1",
      quadratmeterpreis: "",
      kaufpreis: "kaufpreis",
    },
    {
      key: 2,
      vertragsart: "text 2",
      nummer: "Nummer 2",
      quadratmeterpreis: "",
      kaufpreis: "kaufpreis",
    },
    {
      key: 3,
      vertragsart: "text 3",
      nummer: "Nummer 3",
      quadratmeterpreis: "",
      kaufpreis: "kaufpreis",
    },
    {
      key: 4,
      vertragsart: "text 4",
      nummer: "Nummer 4",
      quadratmeterpreis: "",
      kaufpreis: "kaufpreis",
    },
  ];
};
const OperationsPage = ({
  dataIn,
  extractor = mockExtractor,
  width = "100%",
  height = "100%",
  inStory = false,
}) => {
  const data = extractor(dataIn);
  const [activeRow, setActiveRow] = useState(null);
  const [dataContract, setDataContract] = useState(data);
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
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
          <Contracts
            activeRow={activeRow}
            setActiveRow={setActiveRow}
            dataContract={dataContract}
            setDataContract={setDataContract}
          />
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
