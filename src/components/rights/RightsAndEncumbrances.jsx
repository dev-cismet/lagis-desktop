import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableMock from "../ui/tables/TableMock";
import ModalForm from "../ui/forms/ModalForm";
import { useState } from "react";
const columns = [
  {
    title: "ist Recht",
    dataIndex: "recht",
  },
  {
    title: "Art",
    dataIndex: "art",
  },
  {
    title: "Art des Rechts",
    dataIndex: "artrecht",
  },
  {
    title: "Nummer",
    dataIndex: "nummer",
  },
  {
    title: "Eintragung",
    dataIndex: "eintragung",
  },
  {
    title: "Löschung",
    dataIndex: "löschung",
  },
  {
    title: "Bemerkung",
    dataIndex: "bemerkung",
  },
];
const mockExtractor = (input) => {
  return [
    {
      key: "1",
      recht: "",
      art: "Dienstbarkeit",
      artrecht: "Geh- und Fahrrecht",
      nummer: "Dept. II, No. 22",
      eintragung: "7.5.2001",
      löschung: "21.7.2016",
      bemerkung: "21.7.2016",
    },
    {
      key: "2",
      recht: "",
      art: "Dienstbarkeit",
      artrecht: "Geh- und Fahrrecht",
      nummer: "Dept. II, No. 23",
      eintragung: "7.5.2001",
      löschung: "21.7.2016",
      bemerkung: "",
    },
    {
      key: "3",
      recht: "",
      art: "Dienstbarkeit",
      artrecht: "Geh- und Fahrrecht",
      nummer: "Dept. II, No. 24",
      eintragung: "7.5.2001",
      löschung: "21.7.2016",
      bemerkung: "",
    },
    {
      key: "4",
      recht: "",
      art: "Dienstbarkeit",
      artrecht: "Geh- und Fahrrecht",
      nummer: "Dept. II, No. 25",
      eintragung: "7.5.2001",
      löschung: "",
      bemerkung: "",
    },
  ];
};

const RightsAndEncumbrances = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  const [activeRow, setActiveRow] = useState({});
  const data = extractor(dataIn);
  const isStory = false;
  const storyStyle = { width, height, ...style };
  return (
    <div
      style={isStory ? storyStyle : { height: "100%" }}
      className="shadow-md"
    >
      <InfoBlock
        title="Rechte und Belastungen"
        controlBar={
          <ToggleModal
            section="Rechte und Belastungen"
            name="Rechte und Belastungen"
            content={
              <ModalForm
                fields={[
                  {
                    title: "Ist Recht",
                    value: activeRow.recht,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Art",
                    value: activeRow.art,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Art des Rechts",
                    value: activeRow.artrecht,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Nummer",
                    value: activeRow.nummer,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Eintragung",
                    value: activeRow.eintragung,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Löschung",
                    value: activeRow.löschung,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Bemerkung",
                    value: activeRow.bemerkung,
                    rules: [{ required: true }],
                  },
                ]}
                size={8}
                buttonPosition={{ justifyContent: "end" }}
              />
            }
            modalWidth={900}
          />
        }
      >
        <TableMock columns={columns} data={data} activerow={setActiveRow} />
      </InfoBlock>
    </div>
  );
};

export default RightsAndEncumbrances;
RightsAndEncumbrances.propTypes = {
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
