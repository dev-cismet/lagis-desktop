import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableCustom from "../ui/tables/TableCustom";
import ModalForm from "../ui/forms/ModalForm";
import mockFoto from "../../assets/docksMock.png";
import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { FileWordOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    id: "name",
  },
  {
    title: "Dateiname",
    dataIndex: "file",
    id: "file",
  },
  {
    title: "Beschreibung",
    dataIndex: "beschreibung",
    id: "beschreibung",
  },
  {
    title: "Vorschau",
    dataIndex: "vorschau",
    id: "vorschau",
    render: (render) => (
      <div className="flex items-center justify-center">
        <FileWordOutlined style={{ fontSize: "20px" }} />
      </div>
    ),
  },
];
// {
//   title: "Vorschau",
//   dataIndex: "vorschau",
//   id: "vorschau",
//   render: (render) => (
//     <img src={render.vorschau} style={{ width: 80, height: 70 }} />
//   ),
// },
const mockExtractor = (input) => {
  return [
    {
      id: "1",
      name: "1237563255",
      file: "Interdum.avi",
      beschreibung: "Lorem ipsum dolor sit amet",
      vorschau: mockFoto,
    },
    {
      id: "2",
      name: "1237563255",
      file: "Interdum.avi",
      beschreibung: "Lorem ipsum dolor sit amet",
      vorschau: mockFoto,
    },
    {
      id: "3",
      name: "1237563255",
      file: "Interdum.avi",
      beschreibung: "Lorem ipsum dolor sit amet",
      vorschau: mockFoto,
    },
    {
      id: "4",
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
  const isStory = false;
  const storyStyle = { width, height, ...style };
  const [dms, setDms] = useState([]);
  const [activeRow, setActiveRow] = useState();
  const addRow = () => {
    const newRow = {
      id: nanoid(),
      name: "",
      file: "",
      beschreibung: "",
      vorschau: "",
    };
    setDms((prev) => [...prev, newRow]);
    setActiveRow(newRow);
  };
  const deleteRow = () => {
    const updatedArray = dms.filter((row) => row.id !== activeRow?.id);
    setDms(updatedArray);
    if (activeRow?.id === dms[0].id) {
      setActiveRow(dms[1]);
    } else {
      setActiveRow(dms[0]);
    }
  };
  useEffect(() => {
    const data = extractor(dataIn);
    if (data.length > 0) {
      setDms(data);
      setActiveRow(data[0]);
    }
  }, [dataIn]);
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
              formName={activeRow?.id}
              customFields={[
                {
                  title: "Name",
                  value: activeRow?.name,
                  id: nanoid(),
                  name: "name",
                },
                {
                  title: "Dateiname",
                  value: activeRow?.file,
                  id: nanoid(),
                  name: "file",
                },
                {
                  title: "Beschreibung",
                  value: activeRow?.beschreibung,
                  id: nanoid(),
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
