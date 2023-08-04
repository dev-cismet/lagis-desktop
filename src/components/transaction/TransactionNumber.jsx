import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableMock from "../ui/tables/TableMock";
import ModalForm from "../ui/forms/ModalForm";
const columns = [
  {
    title: "Kassenzeichen",
    dataIndex: "kassenzeichen",
  },
  {
    title: "Zugeordnet am",
    dataIndex: "zugeordnet",
  },
];
const mockExtractor = (input) => {
  return [
    {
      key: "1",
      kassenzeichen: "1237563255",
      zugeordnet: "02.05.2023",
    },
    {
      key: "2",
      kassenzeichen: "1237563255",
      zugeordnet: "02.05.2023",
    },
    {
      key: "3",
      kassenzeichen: "1237563255",
      zugeordnet: "02.05.2023",
    },
    {
      key: "4",
      kassenzeichen: "1237563255",
      zugeordnet: "02.05.2023",
    },
  ];
};
const TransactionNumber = ({
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
      className="shadow-md"
      style={
        isStory
          ? storyStyle
          : { height: "100%", borderRadius: "6px", backgroundColor: "#FFFFFF" }
      }
    >
      <InfoBlock
        title="Kassenzeicheninformationen"
        controlBar={
          <ToggleModal
            section="Kassenzeichen"
            content={
              <ModalForm
                fields={[
                  { title: "Kassenzeichen", rules: [{ required: true }] },
                  { title: "Zugeordnet am", rules: [{ required: true }] },
                ]}
              />
            }
          />
        }
      >
        <TableMock columns={columns} data={data} />
      </InfoBlock>
    </div>
  );
};

export default TransactionNumber;
TransactionNumber.propTypes = {
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
