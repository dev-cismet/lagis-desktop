import { Col, Row } from "antd";
import Map from "../components/commons/Map";

const Transaction = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      background: "gray",
      padding: "4px",
    };
  }
  const firstRowStyle = { width: "100%", height: height * 0.57 - 20 };
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
          height: "57%",
          ...marginBottomStyle,
        }}
      >
        <Col span={24}>
          <Map width={"100%"} height={firstRowStyle.height} />
        </Col>
      </Row>
      <Row
        gutter={gutterStyle}
        style={{
          // border: "2px solid red",
          ...marginBottomStyle,
        }}
      >
        <Col span={12}>{/* <ContractData /> */}</Col>
        <Col span={12}>{/* <CrossReferences /> */}</Col>
      </Row>
      <Row
        gutter={gutterStyle}
        style={{
          // border: "2px solid red",
          ...marginBottomStyle,
        }}
      >
        <Col span={24}>{/* <NoteOperations /> */}</Col>
      </Row>
    </div>
  );
};

export default Transaction;
