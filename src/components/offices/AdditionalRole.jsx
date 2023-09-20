import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableCustom from "../ui/tables/TableCustom";
import ModalForm from "../ui/forms/ModalForm";
import { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
const columns = [
  {
    title: "Dienststelle",
    dataIndex: "agency",
    render: (title, record, rowIndex) => (
      <div className="flex items-center">
        <span
          style={{
            width: "9px",
            height: "11px",
            marginRight: "6px",
            backgroundColor: record.color,
          }}
        ></span>
        <span>{title}</span>
      </div>
    ),
  },
  {
    title: "Rolle",
    dataIndex: "rolle",
  },
];
const mockExtractor = () => {
  return [
    {
      id: "1",
      agency: "12345678910",
      rolle: "02.05.2023",
    },
    {
      id: "2",
      agency: "12345678910",
      rolle: "02.05.2023",
    },
    {
      id: "3",
      agency: "12345678910",
      rolle: "02.05.2023",
    },
    {
      id: "4",
      agency: "12345678910",
      rolle: "02.05.2023",
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
  const isStory = false;
  const storyStyle = { width, height, ...style };
  const dateFormat = "DD.MM.YYYY";
  const data = extractor(dataIn);
  console.log("adr", data);
  const [rolls, setRolls] = useState(data);
  const [activeRow, setActiveRow] = useState(data[0]);
  const addRoll = () => {
    const newRoll = {
      id: nanoid(),
      service: "",
      role: "",
    };
    setRolls((prev) => [...prev, newRoll]);
    setActiveRow(newRoll);
  };
  const deleteAgency = () => {
    const updatedArray = rolls.filter((row) => row.id !== activeRow.id);
    setRolls(updatedArray);
    if (activeRow.id === rolls[0].id) {
      setActiveRow(rolls[1]);
    } else {
      setActiveRow(rolls[0]);
    }
  };
  const editHandle = (updatedObject) => {
    updatedObject.role = updatedObject.role.format("DD.MM.YYYY");
    const targetRow = rolls.find((c) => c.id === updatedObject.id);
    const copyRow = {
      ...targetRow,
      service: updatedObject.service,
      role: updatedObject.role,
    };
    setActiveRow(copyRow);
    setRolls(rolls.map((obj) => (obj.id === copyRow.id ? copyRow : obj)));
  };
  useEffect(() => {
    console.log("add", data);
  }, [data]);
  return (
    <div
      style={
        isStory
          ? storyStyle
          : {
              height: "100%",
              borderRadius: "6px",
              backgroundColor: "#ffffff",
              overflow: "auto",
            }
      }
      className="shadow-md"
    >
      <InfoBlock
        title="Zusätzliche Rollen"
        controlBar={
          <ToggleModal
            section="Verwaltungsbereiche"
            name="Zusätzliche Rollen"
            addRow={addRoll}
            deleteActiveRow={deleteAgency}
          >
            <ModalForm
              formName={activeRow?.id}
              updateHandle={editHandle}
              customFields={[
                {
                  title: "Dienst",
                  value: activeRow?.service,
                  id: nanoid(),
                  name: "service",
                },
                {
                  title: "Role",
                  value:
                    activeRow?.rolle === ""
                      ? null
                      : dayjs(activeRow?.rolle, dateFormat),
                  id: nanoid(),
                  name: "role",
                  type: "date",
                },
              ]}
            />
          </ToggleModal>
        }
      >
        <div style={{ position: "relative" }}>
          <TableCustom
            columns={columns}
            data={data}
            activeRow={activeRow}
            setActiveRow={setActiveRow}
            fixHeight={true}
          />
        </div>
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
