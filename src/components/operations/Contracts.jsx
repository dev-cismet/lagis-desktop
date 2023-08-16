import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableMock from "../ui/tables/TableMock";
import ModalForm from "../ui/forms/ModalForm";
import DocsIcons from "../ui/Blocks/DocsIcons";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";

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
      key: 1,
      vertragsart: "text 1",
      nummer: "Nummer 1",
      quadratmeterpreis: "",
      kaufpreis: "kaufpreis",
    },
    {
      key: 2,
      vertragsart: "text 2",
      nummer: "Nummer 2",
      quadratmeterpreis: "",
      kaufpreis: "kaufpreis",
    },
    {
      key: 3,
      vertragsart: "text 3",
      nummer: "Nummer 3",
      quadratmeterpreis: "",
      kaufpreis: "kaufpreis",
    },
    {
      key: 4,
      vertragsart: "text 4",
      nummer: "Nummer 4",
      quadratmeterpreis: "",
      kaufpreis: "kaufpreis",
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
  const [activeRow, setActiveRow] = useState(null);
  const [dataContract, setDataContract] = useState(data);
  const handleAddRow = () => {
    const newData = {
      key: nanoid(),
      vertragsart: "",
      nummer: "",
      quadratmeterpreis: "",
      kaufpreis: "",
    };
    setDataContract((prev) => [...prev, newData]);
  };
  const handleActiveRow = (rowObject) => {
    setActiveRow(rowObject);
  };
  const deleteActiveRow = () => {
    if (activeRow) {
      const updatedArray = dataContract.filter(
        (row) => row.key !== activeRow.key
      );
      setDataContract(updatedArray);
      setActiveRow(null);
    }
  };

  const handleEditActiveContract = (updatedObject) => {
    setActiveRow(updatedObject);
    setDataContract(
      dataContract.map((obj) =>
        obj.key === updatedObject.key ? updatedObject : obj
      )
    );
  };
  const isStory = false;
  const storyStyle = { width, height, ...style };
  useEffect(() => {}, [activeRow]);
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
            addRow={handleAddRow}
            deleteActiveRow={deleteActiveRow}
            isActiveRow={activeRow ? true : false}
            modalWidth={900}
            content={<DocsIcons />}
          >
            <ModalForm
              updateHandle={handleEditActiveContract}
              customFields={[
                {
                  lable: "Vertragsart",
                  value: activeRow?.vertragsart,
                  key: nanoid(),
                  name: "vertragsart",
                },
                {
                  lable: "Nummer",
                  value: activeRow?.nummer,
                  name: "nummer",
                  key: nanoid(),
                },
                {
                  lable: "Quadratmeterpreis",
                  key: nanoid(),
                  value: activeRow?.quadratmeterpreis,
                  name: "quadratmeterpreis",
                },
                {
                  lable: "Kaufpreis (i. NK)",
                  value: activeRow?.kaufpreis,
                  name: "kaufpreis",
                  key: nanoid(),
                },
              ]}
              formName={activeRow?.key}
            />
          </ToggleModal>
        }
      >
        <TableMock
          columns={columns}
          data={dataContract}
          setActiveRow={handleActiveRow}
          activeRow={activeRow}
        />
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
