import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import { Row, Col } from "antd";
const mockExtractor = (input) => {
  return {
    origin: { title: "Origin", data: "02.05.2023" },
    historicalSince: {
      title: "Historisch seit",
      data: "Keine Informationen verfügbar",
    },
    lastOwnership: { title: "Letzter Stadtbesitz", data: "02.05.2023" },
  };
};
const HistoryInfo = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  const data = extractor(dataIn);
  const isStory = false;
  const storyStyle = { width, height, ...style };
  const content = Object.keys(data);

  return (
    <div
      className="shadow-md"
      style={
        isStory
          ? storyStyle
          : {
              height: `${height}px`,
              borderRadius: "6px",
              backgroundColor: "white",
              height: "100%",
            }
      }
    >
      <InfoBlock title="Informationen">
        {content.map((name) => (
          <div
            key={name}
            style={{
              borderBottom: "1px solid #F0F0F0",
              margin: "10px",
              padding: "10px",
            }}
          >
            <Row>
              <Col span={12}>
                <div>{data[name].title}</div>
              </Col>
              <Col span={12}>
                <div>{data[name].data}</div>
              </Col>
            </Row>
          </div>
        ))}
      </InfoBlock>
    </div>
  );
};

export default HistoryInfo;
HistoryInfo.propTypes = {
  /**
   * The current main data object that is being used
   */
  dataIn: PropTypes.object,
  /**
   * The extractor function that is used to transform the dataIn object into the data object
   */
  extractor: PropTypes.func,
  /**
   * The width of the component
   * @default 300
   * @type number
   * @required false
   * @control input
   * @group size
   *
   **/
  width: PropTypes.number,

  /**
   * The height of the component
   *
   * @default 300
   * @type number
   * @required false
   * @control input
   *
   **/

  height: PropTypes.number,
};
