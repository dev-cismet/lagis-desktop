import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import { COLOR_LILA, COLOR_AQUA } from "../ui/generalConstant";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableMock from "../ui/tables/TableMock";
const columns = [
  {
    title: "Agency name",
    dataIndex: "agency",
    render: (title, record, rowIndex) => (
      <div className="flex items-center">
        <span
          style={{
            width: "9px",
            height: "11px",
            marginRight: "6px",
            backgroundColor: rowIndex % 2 === 1 ? COLOR_AQUA : COLOR_LILA,
          }}
        ></span>
        <span>{title}</span>
      </div>
    ),
  },
  {
    title: "Area in m²",
    dataIndex: "area",
  },
];
const mockExtractor = (input) => {
  return [
    {
      key: "1",
      agency: "12345678910",
      area: 12345678910,
    },
    {
      key: "2",
      agency: "12345678910",
      area: 12345678910,
    },
    {
      key: "3",
      agency: "12345678910",
      area: 12345678910,
    },
    {
      key: "4",
      agency: "12345678910",
      area: 12345678910,
    },
  ];
};
const Agencies = ({
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
    <div style={isStory ? storyStyle : { height: "96%" }}>
      <InfoBlock
        title="Dienststellen"
        controlBar={
          <ToggleModal
            section="Verwaltungsbereiche"
            name="Dienststellen"
            inutFirst="Dienststelle"
            inutSecond="Gläche in m2"
          />
        }
      >
        <TableMock columns={columns} data={data} />
      </InfoBlock>
    </div>
  );
};
export default Agencies;
Agencies.propTypes = {
  /**
   * The current main data object that is being used
   */
  dataIn: PropTypes.array,
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
