import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableCustom from "../ui/tables/TableCustom";
import ModalForm from "../ui/forms/ModalForm";
import mockFoto from "../../assets/docksMock.png";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Dateiname",
    dataIndex: "file",
    key: "file",
  },
  {
    title: "Beschreibung",
    dataIndex: "beschreibung",
    key: "beschreibung",
  },
  {
    title: "Vorschau",
    dataIndex: "vorschau",
    key: "vorschau",
    render: (image) => (
      <img src={image} alt="User" style={{ width: 80, height: 70 }} />
    ),
  },
];
const mockExtractor = (input) => {
  return [
    {
      key: "1",
      name: "1237563255",
      file: "Interdum.avi",
      beschreibung: "Lorem ipsum dolor sit amet",
      vorschau: mockFoto,
    },
    {
      key: "2",
      name: "1237563255",
      file: "Interdum.avi",
      beschreibung: "Lorem ipsum dolor sit amet",
      vorschau: mockFoto,
    },
    {
      key: "3",
      name: "1237563255",
      file: "Interdum.avi",
      beschreibung: "Lorem ipsum dolor sit amet",
      vorschau: mockFoto,
    },
    {
      key: "4",
      name: "1237563255",
      file: "Interdum.avi",
      beschreibung: "Lorem ipsum dolor sit amet",
      vorschau: mockFoto,
    },
  ];
};
const DmsBlock = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  const data = extractor(dataIn);
  const isStory = false;
  const storyStyle = { width, height, ...style };
  const [dms, setDms] = useState(data);
  const [activeRow, setActiveRow] = useState(dms[0]);
  const addRow = () => {
    const newRow = {
      key: nanoid(),
      name: "",
      file: "",
      beschreibung: "",
      vorschau: "",
    };
    setDms((prev) => [...prev, newRow]);
    setActiveRow(newRow);
  };
  const deleteRow = () => {
    const updatedArray = dms.filter((row) => row.key !== activeRow?.key);
    setDms(updatedArray);
    if (activeRow?.key === dms[0].key) {
      setActiveRow(dms[1]);
    } else {
      setActiveRow(dms[0]);
    }
  };
  return (
    <div
      className="shadow-md h-full overflow-auto"
      style={
        isStory
          ? storyStyle
          : { height: "100%", borderRadius: "6px", backgroundColor: "#FFFFFF" }
      }
    >
      <InfoBlock
        title="Dokumenten Management System"
        controlBar={
          <ToggleModal
            section="Kassenzeichen"
            addRow={addRow}
            deleteActiveRow={deleteRow}
          >
            <ModalForm
              formName={activeRow?.key}
              customFields={[
                {
                  title: "Name",
                  value: activeRow?.name,
                  key: nanoid(),
                  name: "name",
                },
                {
                  title: "Dateiname",
                  value: activeRow?.file,
                  key: nanoid(),
                  name: "file",
                },
                {
                  title: "Beschreibung",
                  value: activeRow?.beschreibung,
                  key: nanoid(),
                  name: "beschreibung",
                },
              ]}
              showFileUpload={true}
            />
          </ToggleModal>
        }
      >
        <div className="relative">
          <TableCustom
            columns={columns}
            data={dms}
            activerow={setActiveRow}
            activeRow={activeRow}
            setActiveRow={setActiveRow}
            fixHeight={true}
          />
        </div>
      </InfoBlock>
    </div>
  );
};

export default DmsBlock;
DmsBlock.propTypes = {
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
