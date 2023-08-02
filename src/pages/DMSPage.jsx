import { Col, Row } from "antd";
import DmsBlock from "../components/dms/DmsBlock";
const DMSPage = ({ width = "100%", height = "100%", inStory = false }) => {
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
  return (
    <div
      style={{
        ...storyStyle,
        width,
        height,
        backgroundColor: "#F1F1F1",
      }}
    >
      <Row gutter={gutterStyle}>
        <Col span={24}>
          <DmsBlock />
        </Col>
      </Row>
    </div>
  );
};

export default DMSPage;
