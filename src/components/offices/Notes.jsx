import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import { Input, Checkbox } from "antd";
import CustomNotes from "../ui/notes/CustomNotes";
const { TextArea } = Input;
const mockExtractor = (input) => {
  return { note: "3" };
};
const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const Notes = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  const data = extractor(dataIn);
  const isStory = false;
  const storyStyle = { width, height, ...style };
  console.log("Notes !!!!!!! Height", height);
  return (
    <div
      style={
        isStory
          ? storyStyle
          : { backgroundColor: "white", borderRadius: "6px", height }
      }
    >
      <InfoBlock
        title="Bemerkungen"
        controlBar={<Checkbox onChange={onChange}>Sperre</Checkbox>}
      >
        <CustomNotes height={height} />
      </InfoBlock>
    </div>
  );
};
export default Notes;
Notes.propTypes = {
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
