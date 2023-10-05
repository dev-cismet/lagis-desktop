import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import { Row, Col, Checkbox } from "antd";
const mockExtractor = (input) => {
  return {
    options: ["an Bildschirmgröße anpassen", "Historie halten"],
  };
};

const OptionHistory = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  const data = extractor(dataIn);
  const isStory = false;
  const storyStyle = { width, height, ...style };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div
      className="shadow-md w-full h-full overflow-auto"
      style={
        isStory
          ? storyStyle
          : {
              // height: `${height}px`,
              borderRadius: "6px",
              backgroundColor: "white",
              // height: "100%",
            }
      }
    >
      <InfoBlock title="Optionen">
        <div className="mt-2">
          {data.options.map((i, idx) => (
            <div
              key={idx}
              style={{
                padding: "10px",
              }}
            >
              <Row>
                <Col span={24}>
                  <Checkbox onChange={onChange}>{i}</Checkbox>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </InfoBlock>
    </div>
  );
};

export default OptionHistory;
OptionHistory.propTypes = {
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
