import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableCustom from "../ui/tables/TableCustom";
import ModalForm from "../ui/forms/ModalForm";
import { useEffect, useState } from "react";
import "./offices.css";
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
    title: "Straße",
    dataIndex: "street",
  },
  {
    title: "Länge (in m)",
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
  const isStory = false;
  const storyStyle = { width, height, ...style };
  const dateFormat = "DD.MM.YYYY";
  const data = extractor(dataIn);
  const [streetfronts, setStreetfronts] = useState(data);
  const [activeRow, setActiveRow] = useState(streetfronts[0]);
  const addRow = () => {
    const newRow = {
      key: nanoid(),
      street: "",
      length: "",
    };
    setStreetfronts((prev) => [...prev, newRow]);
    setActiveRow(newRow);
  };
  const deleteRow = () => {
    const updatedArray = streetfronts.filter(
      (row) => row.key !== activeRow?.key
    );
    setStreetfronts(updatedArray);
    if (activeRow?.key === streetfronts[0].key) {
      setActiveRow(streetfronts[1]);
    } else {
      setActiveRow(streetfronts[0]);
    }
  };
  const editHandle = (updatedObject) => {
    updatedObject.length = updatedObject.length.format("DD.MM.YYYY");
    const targetRow = streetfronts.find((c) => c.key === updatedObject.key);
    const copyRow = {
      ...targetRow,
      street: updatedObject.street,
      length: updatedObject.length,
    };

    setActiveRow(copyRow);
    setStreetfronts(
      streetfronts.map((obj) => (obj.key === copyRow.key ? copyRow : obj))
    );
  };
  useEffect(() => {
    const streetfrontsTableFormat = dataIn.map((s) => ({
      key: s.id,
      street: s.strassenname,
      length: s.laenge,
    }));
    setStreetfronts(streetfrontsTableFormat);
  }, [dataIn]);
  return (
    <div
      className="shadow-md"
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
    >
      <InfoBlock
        title="Straßenfronten"
        controlBar={
          <ToggleModal
            section="Verwaltungsbereiche"
            name="Straßenfronten"
            addRow={addRow}
            deleteActiveRow={deleteRow}
          >
            <ModalForm
              formName={activeRow?.key}
              updateHandle={editHandle}
              customFields={[
                {
                  title: "Straßen",
                  value: activeRow?.street,
                  key: nanoid(),
                  name: "street",
                },
                {
                  title: "Length",
                  value:
                    activeRow?.length === ""
                      ? null
                      : dayjs(activeRow?.length, dateFormat),
                  key: nanoid(),
                  name: "length",
                  type: "date",
                },
              ]}
            />
          </ToggleModal>
        }
      >
        <div className="relative">
          <TableCustom
            columns={columns}
            data={streetfronts}
            activeRow={activeRow}
            setActiveRow={setActiveRow}
            fixHeight={true}
          />
        </div>
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
