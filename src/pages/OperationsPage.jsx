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
      vertragsart: "Vermietung",
      nummer: "Nummer 1",
      quadratmeterpreis: "1000",
      kaufpreis: "kaufpreis 1",
      note: "Text of note 1",
    },
    {
      key: 2,
      vertragsart: "Leasing",
      nummer: "Nummer 2",
      quadratmeterpreis: "2000",
      kaufpreis: "kaufpreis 2",
      note: "Text of note 2",
    },
    {
      key: 3,
      vertragsart: "Leasing",
      nummer: "Nummer 3",
      quadratmeterpreis: "3000",
      kaufpreis: "kaufpreis 3",
      note: "Text of note 3",
    },
    {
      key: 4,
      vertragsart: "Vermietung",
      nummer: "Nummer 4",
      quadratmeterpreis: "4000",
      kaufpreis: "kaufpreis 4",
      note: "Text of note 4",
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
          <NoteOperations
            activeRow={activeRow}
            dataContract={dataContract}
            setDataContract={setDataContract}
          />
        </Col>
      </Row>
      <Row gutter={gutterStyle}>
        <Col span={12}>
          <ContractData dataContract={dataContract} activeRow={activeRow} />
        </Col>
        <Col span={12}>
          <CrossReferences />
        </Col>
      </Row>
    </div>
  );
};

export default OperationsPage;
