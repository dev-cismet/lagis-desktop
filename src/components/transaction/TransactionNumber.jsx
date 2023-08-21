import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableCustom from "../ui/tables/TableCustom";
import ModalForm from "../ui/forms/ModalForm";
import { useState } from "react";
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
  const dateFormat = "DD.MM.YYYY";
  const [transaction, setTransaction] = useState(data);
  const [activeRow, setActiveRow] = useState(transaction[0]);
  const addRow = () => {
    const newRow = {
      key: nanoid(),
      kassenzeichen: "",
      zugeordnet: "",
    };
    setTransaction((prev) => [...prev, newRow]);
    setActiveRow(newRow);
  };
  const deleteRow = () => {
    const updatedArray = transaction.filter(
      (row) => row.key !== activeRow?.key
    );
    setTransaction(updatedArray);
    if (activeRow?.key === transaction[0].key) {
      setActiveRow(transaction[1]);
    } else {
      setActiveRow(transaction[0]);
    }
  };
  const editHandle = (updatedObject) => {
    updatedObject.zugeordnet = updatedObject.zugeordnet.format("DD.MM.YYYY");
    const targetRow = transaction.find((c) => c.key === updatedObject.key);
    const copyRow = {
      ...targetRow,
      kassenzeichen: updatedObject.kassenzeichen,
      zugeordnet: updatedObject.zugeordnet,
    };

    setActiveRow(copyRow);
    setTransaction(
      transaction.map((obj) => (obj.key === copyRow.key ? copyRow : obj))
    );
  };
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
            addRow={addRow}
            deleteActiveRow={deleteRow}
          >
            <ModalForm
              formName={activeRow?.key}
              updateHandle={editHandle}
              customFields={[
                {
                  title: "Kassenzeichen",
                  value: activeRow?.kassenzeichen,
                  key: nanoid(),
                  name: "kassenzeichen",
                },
                {
                  title: "Zugeordnet am",
                  value:
                    activeRow?.zugeordnet === ""
                      ? null
                      : dayjs(activeRow?.zugeordnet, dateFormat),
                  key: nanoid(),
                  name: "zugeordnet",
                  type: "date",
                },
              ]}
            />
          </ToggleModal>
        }
      >
        <TableCustom
          columns={columns}
          data={transaction}
          activeRow={activeRow}
          setActiveRow={setActiveRow}
        />
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
