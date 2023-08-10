import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import { Tabs } from "antd";
import TableMock from "../ui/tables/TableMock";
import CustomNotes from "../ui/notes/CustomNotes";
import ToggleModal from "../ui/control-board/ToggleModal";
import ModalForm from "../ui/forms/ModalForm";
import "./operations.css";
const { TabPane } = Tabs;

const columns = [
  {
    title: "Beschlussart",
    dataIndex: "beschlussart",
  },
  {
    title: "Datum",
    dataIndex: "datum",
  },
];
const columnsCosts = [
  {
    title: "Kostenart",
    dataIndex: "kostenart",
  },
  {
    title: "Betrag",
    dataIndex: "betrag",
  },
  {
    title: "Anweisung",
    dataIndex: "anweisung",
  },
];
const mockExtractor = (input) => {
  return {
    resolution: [
      {
        key: "1",
        beschlussart: "1237563255",
        datum: "02.05.2023",
      },
      {
        key: "2",
        beschlussart: "1237563255",
        datum: "02.05.2023",
      },
      {
        key: "3",
        beschlussart: "1237563255",
        datum: "02.05.2023",
      },
      {
        key: "4",
        beschlussart: "1237563255",
        datum: "02.05.2023",
      },
    ],
    costs: [
      {
        key: "1",
        kostenart: "1237563255",
        betrag: "02.05.2023",
        anweisung: "02.05.2023",
      },
      {
        key: "2",
        kostenart: "1237563255",
        betrag: "02.05.2023",
        anweisung: "02.05.2023",
      },
      {
        key: "3",
        beschlussart: "1237563255",
        kostenart: "1237563255",
        betrag: "02.05.2023",
        anweisung: "02.05.2023",
      },
      {
        key: "4",
        beschlussart: "1237563255",
        kostenart: "1237563255",
        betrag: "02.05.2023",
        anweisung: "02.05.2023",
      },
    ],
  };
};
const CrossReferences = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  const data = extractor(dataIn);
  return (
    <div
      className="cross-data shadow-md"
      style={{
        height: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "6px",
      }}
    >
      <InfoBlock
        title="QKB"
        controlBar={
          <ToggleModal
            section="Querverweise"
            content={
              <ModalForm
                fields={[
                  { title: "Kostenart", rules: [{ required: true }] },
                  { title: "Betrag", rules: [{ required: true }] },
                  { title: "Anweisung", rules: [{ required: true }] },
                ]}
                size={24}
                buttonPosition={{ justifyContent: "end" }}
                tagsBar={[]}
              />
            }
          />
        }
      >
        <Tabs defaultActiveKey="1" size="small" style={{ padding: "0 18px" }}>
          <TabPane tab="Querverweise" key="1">
            <CustomNotes />
          </TabPane>
          <TabPane tab="Kosten" key="2">
            <TableMock columns={columnsCosts} data={data.costs} />
          </TabPane>
          <TabPane tab="Beschlüsse" key="3">
            <TableMock columns={columns} data={data.resolution} />
          </TabPane>
        </Tabs>
      </InfoBlock>
    </div>
  );
};

export default CrossReferences;
CrossReferences.propTypes = {
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
