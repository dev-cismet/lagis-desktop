import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableMock from "../ui/tables/TableMock";
import ModalForm from "../ui/forms/ModalForm";
import { useState } from "react";
import RightsForm from "./form/RightsForm";
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
    dataIndex: "loschung",
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
      eintragung: "07.05.2001",
      loschung: "21.07.2016",
      bemerkung: "21.07.2016",
    },
    {
      key: "2",
      recht: "",
      art: "Dienstbarkeit",
      artrecht: "Geh- und Fahrrecht",
      nummer: "Dept. II, No. 23",
      eintragung: "7.5.2001",
      loschung: "21.7.2016",
      bemerkung: "",
    },
    {
      key: "3",
      recht: "",
      art: "Dienstbarkeit",
      artrecht: "Geh- und Fahrrecht",
      nummer: "Dept. II, No. 24",
      eintragung: "7.5.2001",
      loschung: "21.7.2016",
      bemerkung: "",
    },
    {
      key: "4",
      recht: "",
      art: "Dienstbarkeit",
      artrecht: "Geh- und Fahrrecht",
      nummer: "Dept. II, No. 25",
      eintragung: "7.5.2001",
      loschung: "",
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
            content={<RightsForm />}
            modalWidth={500}
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
