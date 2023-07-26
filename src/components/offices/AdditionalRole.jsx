import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableMock from "../ui/tables/TableMock";
const columns = [
  {
    title: "Service",
    dataIndex: "service",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
];
const mockExtractor = (input) => {
  return [
    {
      key: "1",
      service: "12345678910",
      role: "02.05.2023",
    },
    {
      key: "2",
      service: "12345678910",
      role: "02.05.2023",
    },
    {
      key: "3",
      service: "12345678910",
      role: "02.05.2023",
    },
    {
      key: "4",
      service: "12345678910",
      role: "02.05.2023",
    },
  ];
};

const AdditionalRole = ({
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
    <div style={isStory ? storyStyle : { height: "80%", overflow: "auto" }}>
      <InfoBlock
        title="Zusätzliche Rollen"
        controlBar={
          <ToggleModal
            section="Verwaltungsbereiche"
            name="Zusätzliche Rollen"
            inutFirst="Service"
            inutSecond="Role"
          />
        }
      >
        <TableMock columns={columns} data={data} />
      </InfoBlock>
    </div>
  );
};
export default AdditionalRole;
AdditionalRole.propTypes = {
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
