import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import { InputNumber, Select } from "antd";

const mockExtractor = (input) => {
  return {
    successor: [
      { value: "Direkte", label: "Direkte Vorgänger/Nachfolger" },
      { value: "Vollständig", label: "Vollständig" },
      { value: "Begrenzte", label: "Begrenzte Tiefe" },
    ],
    parcels: [
      { value: "Flurstücke", label: "Alle flurstücke" },
      { value: "Nachfolger", label: "Nur Nachfolger" },
      { value: "Vorgänger", label: "Nur Vorgänger" },
    ],
  };
};
const View = ({
  dataIn,
  extractor = mockExtractor,
  setFirstDarstellung,
  setSecondDarstellung,
  width = 231,
  height = 188,
  style,
}) => {
  const data = extractor(dataIn);
  const handleChangeFirst = (value) => {
    setFirstDarstellung(value);
  };
  const handleChangeSecond = (value) => {
    setSecondDarstellung(value);
  };

  const onChangeNunber = (value) => {
    console.log("onChangeNunber", value);
  };
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
          <div className="my-4 flex gap-2">
            <Select
              defaultValue="Vollständig"
              style={{ width: "80%", height: "30px" }}
              onChange={handleChangeFirst}
              options={data.successor}
            />
            <InputNumber
              size="small"
              min={1}
              max={100000}
              defaultValue={1}
              style={{ minWidth: "50px", height: "30px" }}
              onChange={onChangeNunber}
            />
          </div>
          <Select
            defaultValue="Flurstücke"
            style={{ width: "100%" }}
            onChange={handleChangeSecond}
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
