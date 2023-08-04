import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableMock from "../ui/tables/TableMock";
import ModalForm from "../ui/forms/ModalForm";
import DocsIcons from "../ui/Blocks/DocsIcons";
const columns = [
  {
    title: "Vertragsart",
    dataIndex: "vertragsart",
  },
  {
    title: "Nummer",
    dataIndex: "nummer",
  },
  {
    title: "Quadratmeterpreis",
    dataIndex: "quadratmeterpreis",
  },
  {
    title: "Kaufpreis (i. NK)",
    dataIndex: "kaufpreis",
  },
];
const mockExtractor = (input) => {
  return [
    {
      key: "1",
      vertragsart: "text",
      nummer: "Nummer",
      quadratmeterpreis: "",
      kaufpreis: "",
    },
    {
      key: "2",
      vertragsart: "text",
      nummer: "Nummer",
      quadratmeterpreis: "",
      kaufpreis: "",
    },
    {
      key: "3",
      vertragsart: "text",
      nummer: "Nummer",
      quadratmeterpreis: "",
      kaufpreis: "",
    },
    {
      key: "4",
      vertragsart: "text",
      nummer: "Nummer",
      quadratmeterpreis: "",
      kaufpreis: "",
    },
  ];
};
const Contracts = ({
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
      style={
        isStory
          ? storyStyle
          : {
              height: "100%",
              backgroundColor: "#FFFFFF",
              borderRadius: "6px",
            }
      }
      className="shadow-md"
    >
      <InfoBlock
        title="Vorgänge"
        controlBar={
          <ToggleModal
            section="Verträge"
            content={
              <ModalForm
                fields={[
                  { title: "Vertragsart", rules: [{ required: true }] },
                  { title: "Nummer", rules: [{ required: true }] },
                  { title: "Quadratmeterpreis", rules: [{ required: true }] },
                  { title: "Kaufpreis (i. NK)", rules: [{ required: true }] },
                ]}
                size={8}
                buttonPosition={{ justifyContent: "end" }}
                tagsBar={[]}
              />
            }
            modalWidth={900}
          >
            <DocsIcons />
          </ToggleModal>
        }
      >
        <TableMock columns={columns} data={data} pagination={false} />
      </InfoBlock>
    </div>
  );
};

export default Contracts;
Contracts.propTypes = {
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
