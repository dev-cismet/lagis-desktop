import { Col, Row } from "antd";
import Graph from "../components/commons/Graph";
import HistoryInfo from "../components/history/HistoryInfo";
import View from "../components/history/View";
import OptionHistory from "../components/history/OptionHistory";
const HistoryPage = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid ",
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
      <Row gutter={gutterStyle} style={{ ...marginBottomStyle }}>
        <Col span={8}>
          <Graph width={width} height={height} />
        </Col>
      </Row>
      <Row gutter={gutterStyle} style={{ ...marginBottomStyle }}>
        <Col span={8}>
          <HistoryInfo />
        </Col>
        <Col span={8}>
          <View />
        </Col>
        <Col span={8}>
          <OptionHistory />
        </Col>
      </Row>
    </div>
  );
};

export default HistoryPage;
