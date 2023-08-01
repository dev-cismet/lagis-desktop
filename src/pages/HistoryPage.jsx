import { Col, Row } from "antd";
import Graph from "../components/commons/Graph";
const HistoryPage = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      background: "gray",
      padding: "4px",
    };
  }
  return (
    <div
      style={{
        ...storyStyle,
        width,
        height,
        backgroundColor: "#F1F1F1",
      }}
    >
      <Row>
        <Col soan={24}>
          <Graph width="1100" />
        </Col>
      </Row>
    </div>
  );
};

export default HistoryPage;
