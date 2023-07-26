import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import { ReloadOutlined } from "@ant-design/icons";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableMock from "../ui/tables/TableMock";
import ModalForm from "../ui/forms/ModalForm";
const columns = [
  {
    title: "Street",
    dataIndex: "street",
  },
  {
    title: "Length",
    dataIndex: "length",
  },
];
const mockExtractor = (input) => {
  return [
    {
      key: "1",
      street: "12345678910",
      length: "02.05.2023",
    },
    {
      key: "2",
      street: "12345678910",
      length: "02.05.2023",
    },
    {
      key: "3",
      street: "12345678910",
      length: "02.05.2023",
    },
    {
      key: "4",
      street: "12345678910",
      length: "02.05.2023",
    },
  ];
};
const Streetfronts = ({
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
    <div className="" style={isStory ? storyStyle : { height: "80%" }}>
      <InfoBlock
        title="Straßenfronten"
        controlBar={
          <ToggleModal
            section="Verwaltungsbereiche"
            name="Straßenfronten"
            // inutFirst="Straßen"
            // inutSecond="Length"
            content={
              <ModalForm
                fields={[
                  { title: "Straßen", rules: [{ required: true }] },
                  { title: "Length", rules: [{ required: true }] },
                ]}
              />
            }
          >
            <ReloadOutlined
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#DDE2E8",
                borderRadius: "2px",
                lineHeight: "18px",
                textAlign: "center",
                fontSize: "8px",
              }}
            />
          </ToggleModal>
        }
      >
        <TableMock columns={columns} data={data} />
      </InfoBlock>
    </div>
  );
};
export default Streetfronts;
Streetfronts.propTypes = {
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
