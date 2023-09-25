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
  const firstRow = { height: height * 0.5 - 16 };
  const gutterStyle = [16, 16];
  const marginBottomStyle = { marginBottom: "16px" };
  return (
    <div
      style={{
        ...storyStyle,
        width,
        height: "100%",
        backgroundColor: "#F1F1F1",
      }}
    >
      <Row
        gutter={gutterStyle}
        style={{ height: firstRow.height, ...marginBottomStyle }}
      >
        <Col span={24}>
          <Graph width={width} height={firstRow.height} />
        </Col>
      </Row>
      <Row gutter={gutterStyle}>
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
