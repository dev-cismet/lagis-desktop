import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import { Row, Col, Space, Select } from "antd";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const mockExtractor = (input) => {
  return {
    successor: [
      { value: "Direkte", label: "Direkte" },
      { value: "Vorgänger", label: "Vorgänger" },
      { value: "Nachfolger", label: "Nachfolger" },
    ],
    parcels: [
      { value: "Direkte", label: "Direkte" },
      { value: "Vorgänger", label: "Vorgänger" },
      { value: "Nachfolger", label: "Nachfolger" },
    ],
  };
};
const View = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  const data = extractor(dataIn);
  const isStory = false;
  const storyStyle = { width, height, ...style };
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
      <InfoBlock title="Darstellung">
        <div className="flex flex-col p-4 pt-1">
          <div className="my-4">
            <Select
              defaultValue="Nachfolger"
              style={{ width: 120 }}
              onChange={handleChange}
              options={data.successor}
            />
          </div>
          <Select
            defaultValue="Vorgänger"
            style={{ width: 120 }}
            onChange={handleChange}
            options={data.parcels}
          />
        </div>
      </InfoBlock>
    </div>
  );
};
export default View;
View.propTypes = {
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
