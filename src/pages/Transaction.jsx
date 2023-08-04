import { Col, Row } from "antd";
import Map from "../components/commons/Map";
import TransactionNumber from "../components/transaction/TransactionNumber";

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
          ...marginBottomStyle,
        }}
      >
        <Col span={24}>
          <Map width={"100%"} height={"350px"} />
        </Col>
      </Row>
      <Row gutter={gutterStyle}>
        <Col span={24}>
          <TransactionNumber />
        </Col>
      </Row>
    </div>
  );
};

export default Transaction;
