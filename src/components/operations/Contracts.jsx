import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableMock from "../ui/tables/TableMock";
import ModalForm from "../ui/forms/ModalForm";
import DocsIcons from "../ui/Blocks/DocsIcons";
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

const Contracts = ({
  width = 231,
  height = 188,
  style,
  activeRow,
  setActiveRow,
  dataContract,
  setDataContract,
}) => {
  const handleAddRow = () => {
    const newData = {
      key: nanoid(),
      vertragsart: "",
      nummer: "",
      quadratmeterpreis: "",
      kaufpreis: "",
      note: "",
      kosten: [{ key: nanoid(), kostenart: "", betrag: "", anweisung: "" }],
      resolution: [
        {
          key: 1,
          beschlussart: "",
          datum: "",
        },
      ],
    };
    setDataContract((prev) => [...prev, newData]);
    setActiveRow(null);
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
        obj.key === updatedObject.key ? { ...obj, ...updatedObject } : obj
      )
    );
  };
  const isStory = false;
  const storyStyle = { width, height, ...style };
  useEffect(() => {}, [activeRow, dataContract]);
  return (
    <div>
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
              content={
                <DocsIcons classnames="flex justify-center items-center gap-1" />
              }
            >
              <ModalForm
                updateHandle={handleEditActiveContract}
                customFields={[
                  {
                    title: "Vertragsart",
                    value: activeRow?.vertragsart,
                    key: nanoid(),
                    name: "vertragsart",
                    type: "select",
                    options: [
                      {
                        value: "Vermietung",
                        lable: "Vermietung",
                      },
                      {
                        value: "Leasing",
                        lable: "Leasing",
                      },
                    ],
                  },
                  {
                    title: "Nummer",
                    value: activeRow?.nummer,
                    name: "nummer",
                    key: nanoid(),
                  },
                  {
                    title: "Quadratmeterpreis",
                    key: nanoid(),
                    value: activeRow?.quadratmeterpreis,
                    name: "quadratmeterpreis",
                  },
                  {
                    title: "Kaufpreis (i. NK)",
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
