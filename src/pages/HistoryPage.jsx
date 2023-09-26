import { Col, Row } from "antd";
import Graph from "../components/commons/Graph";
import HistoryInfo from "../components/history/HistoryInfo";
import View from "../components/history/View";
import OptionHistory from "../components/history/OptionHistory";
import { useSelector } from "react-redux";
import { getHistory, getLandparcel } from "../store/slices/lagis";
import { generateGraphString } from "../core/tools/history";
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
  const history = useSelector(getHistory);
  const fstck = useSelector(getLandparcel);

  let fstckString;
  if (fstck) {
    fstckString = `${fstck.flurstueck_schluessel.gemarkung.bezeichnung} ${fstck.flurstueck_schluessel.flur} ${fstck.flurstueck_schluessel.flurstueck_zaehler}/${fstck.flurstueck_schluessel.flurstueck_nenner}`;
  }
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
          <Graph
            width={width}
            height={firstRow.height}
            dataIn={history}
            extractor={(histObj) => {
              if (histObj) {
                return generateGraphString(histObj, fstckString);
              } else {
                return undefined;
              }
            }}
          />
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
