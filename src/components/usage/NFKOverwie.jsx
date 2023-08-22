import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableCustom from "../ui/tables/TableCustom";
import ModalForm from "../ui/forms/ModalForm";
import { EuroCircleOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

const columns = [
  {
    title: "Anlageklasse",
    dataIndex: "anlageklasse",
  },
  {
    title: "Summe",
    dataIndex: "summe",
  },
];
const mockExtractor = (input) => {
  return [
    {
      key: "1",
      anlageklasse: "12345678910",
      summe: "2609.10 €",
    },
    {
      key: "2",
      anlageklasse: "12345678910",
      summe: "2609.10 €",
    },
    {
      key: "3",
      anlageklasse: "12345678910",
      summe: "2609.10 €",
    },
    {
      key: "4",
      anlageklasse: "12345678910",
      summe: "2609.10 €",
    },
  ];
};
const NFKOverwie = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  const data = extractor(dataIn);
  const isStory = false;
  const storyStyle = { width, height, ...style };
  const [dataTable, setDataTable] = useState(data);
  const [activeRow, setActiveRow] = useState(dataTable[0]);
  const addRow = () => {
    const newRow = {
      key: nanoid(),
      anlageklasse: "",
      summe: "",
    };
    setDataTable((prev) => [...prev, newRow]);
    setActiveRow(newRow);
  };
  const deleteRow = () => {
    const updatedArray = dataTable.filter((row) => row.key !== activeRow?.key);
    setDataTable(updatedArray);
    if (activeRow?.key === dataTable[0].key) {
      setActiveRow(dataTable[1]);
    } else {
      setActiveRow(dataTable[0]);
    }
  };
  return (
    <div
      style={
        isStory
          ? storyStyle
          : {
              height: "100%",
              borderRadius: "6px",
              backgroundColor: "white",
            }
      }
      className="shadow-md"
    >
      <InfoBlock
        title="Nutzung"
        titleAction={
          <Tag
            bordered={false}
            color="blue"
            style={{ padding: "0.1rem 0.8rem" }}
          >
            Stille Reserve: 40.000 €
          </Tag>
        }
        controlBar={
          <ToggleModal
            addRow={addRow}
            deleteActiveRow={deleteRow}
            section="Nutzung"
            name="NKF Overview"
            content={
              <div className="mr-auto">
                <Button
                  type="primary"
                  size="small"
                  icon={<EuroCircleOutlined />}
                >
                  Buchen
                </Button>
              </div>
            }
          >
            <ModalForm
              formName={activeRow?.key}
              customFields={[
                {
                  title: "Anlageklasse",
                  value: activeRow?.anlageklasse,
                  key: nanoid(),
                  name: "anlageklasse",
                },
                {
                  title: "Summe",
                  value: activeRow?.summe,
                  key: nanoid(),
                  name: "summe",
                },
              ]}
              size={24}
            />
          </ToggleModal>
        }
      >
        <TableCustom
          columns={columns}
          data={dataTable}
          activeRow={activeRow}
          setActiveRow={setActiveRow}
        />
      </InfoBlock>
    </div>
  );
};

export default NFKOverwie;
NFKOverwie.propTypes = {
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
