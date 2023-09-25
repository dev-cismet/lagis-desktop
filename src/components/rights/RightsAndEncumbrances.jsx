import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import TableCustom from "../ui/tables/TableCustom";
import { useEffect, useState } from "react";
import RightsForm from "./form/RightsForm";
import ToggleModal from "../ui/control-board/ToggleModal";
import { nanoid } from "@reduxjs/toolkit";
import { Switch } from "antd";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
const columns = [
  {
    title: "ist Recht",
    dataIndex: "recht",
    render: (record) => <Switch size="small" checked={record} />,
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
      id: "1",
      recht: "",
      art: "Dienstbarkeit",
      artrecht: "Geh- und Fahrrecht",
      nummer: "Dept. II, No. 22",
      eintragung: "07.05.2001",
      loschung: "21.07.2016",
      bemerkung: "21.07.2016",
    },
    {
      id: "2",
      recht: "",
      art: "Dienstbarkeit",
      artrecht: "Geh- und Fahrrecht",
      nummer: "Dept. II, No. 23",
      eintragung: "07.05.2001",
      loschung: "21.07.2016",
      bemerkung: "1111111",
    },
    {
      id: "3",
      recht: "",
      art: "Dienstbarkeit",
      artrecht: "Geh- und Fahrrecht",
      nummer: "Dept. II, No. 24",
      eintragung: "07.5.2001",
      loschung: "21.07.2016",
      bemerkung: "22222",
    },
    {
      id: "4",
      recht: "",
      art: "Dienstbarkeit",
      artrecht: "Geh- und Fahrrecht",
      nummer: "Dept. II, No. 25",
      eintragung: "07.05.2001",
      loschung: "12.06.2002",
      bemerkung: "3333333",
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
  // const data = extractor(dataIn);
  const isStory = false;
  const storyStyle = { width, height, ...style };
  // const dateFormat = "DD.MM.YYYY";
  const [rights, setRghts] = useState([]);
  const [activeRow, setActiveRow] = useState();
  const addRow = () => {
    const newRow = {
      id: nanoid(),
      recht: "",
      art: "",
      artrecht: "",
      nummer: "",
      eintragung: "",
      loschung: "",
      bemerkung: "",
    };
    setRghts((prev) => [...prev, newRow]);
    setActiveRow(newRow);
  };
  const deleteRow = () => {
    const updatedArray = rights.filter((row) => row.id !== activeRow?.id);
    setRghts(updatedArray);
    if (activeRow?.id === rights[0].id) {
      setActiveRow(rights[1]);
    } else {
      setActiveRow(rights[0]);
    }
  };
  useEffect(() => {
    const data = extractor(dataIn);
    setRghts(data);
    setActiveRow(data[0]);
  }, [dataIn]);
  return (
    <div
      style={isStory ? storyStyle : { height: "100%" }}
      className="shadow-md overflow-auto"
    >
      <InfoBlock
        title="Rechte und Belastungen"
        controlBar={
          <ToggleModal
            section="Rechte und Belastungen"
            modalWidth={500}
            addRow={addRow}
            deleteActiveRow={deleteRow}
          >
            <RightsForm fields={activeRow} />
          </ToggleModal>
        }
      >
        <div className="relative">
          <TableCustom
            columns={columns}
            data={rights}
            activeRow={activeRow}
            setActiveRow={setActiveRow}
            fixHeight={true}
          />
        </div>
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
