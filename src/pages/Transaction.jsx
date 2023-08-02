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
  const firstRowStyle = { width: "100%", height: height * 0.57 - 20 };
  const secondRowStyle = { width: "100%", height: height * 0.43 };
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
          height: firstRowStyle.height,
          ...marginBottomStyle,
        }}
      >
        <Col span={24}>
          <Map width={"100%"} height={"100%"} />
        </Col>
      </Row>
      <Row
        gutter={gutterStyle}
        style={{
          height: secondRowStyle.height,
        }}
      >
        <Col span={24}>
          <TransactionNumber />
        </Col>
      </Row>
    </div>
  );
};

export default Transaction;
