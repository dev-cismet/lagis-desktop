import PropTypes from "prop-types";
import { useState } from "react";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableCustom from "../ui/tables/TableCustom";
import ModalForm from "../ui/forms/ModalForm";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { compare } from "../../core/tools/helper";
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
            backgroundColor: record?.color || "transporent",
          }}
        ></span>
        <span>{title}</span>
      </div>
    ),
    sorter: (a, b) => compare(a.type, b.type),
  },
  {
    title: "Fläche in m²",
    dataIndex: "area",
    sorter: (a, b) => compare(a.agency, b.agency),
  },
];
const mockExtractor = (input) => {
  return [
    {
      id: "1",
      agency: "23345678900",
      area: "11145678910",
    },
    {
      id: "2",
      agency: "1234567890105",
      area: "22245678910",
    },
    {
      id: "3",
      agency: "33345678933",
      area: "33345678910",
    },
    {
      id: "4",
      agency: "444345678944",
      area: "44445678910",
    },
  ];
};
const Agencies = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  const isStory = false;
  const storyStyle = { width, height, ...style };
  // const data = extractor(dataIn);
  const [agency, setAgency] = useState([]);
  const [activeRow, setActiveRow] = useState();
  const addAgency = () => {
    const newAgency = {
      id: nanoid(),
      agency: "",
      area: "",
    };
    setAgency((prev) => [...prev, newAgency]);
    setActiveRow(newAgency);
  };
  const deleteAgency = () => {
    const updatedArray = agency.filter((row) => row.id !== activeRow.id);
    setAgency(updatedArray);
    setAgency(updatedArray);
    if (activeRow.id === agency[0].id) {
      setActiveRow(agency[1]);
    } else {
      setActiveRow(agency[0]);
    }
  };
  const editHandle = (updatedObject) => {
    const targetRow = agency.find((c) => c.id === updatedObject.id);
    const copyRow = {
      ...targetRow,
      agency: updatedObject.agency,
      area: updatedObject.area,
    };

    setActiveRow(copyRow);
    setAgency(agency.map((obj) => (obj.id === copyRow.id ? copyRow : obj)));
  };
  useEffect(() => {
    const data = extractor(dataIn);

    if (data.length > 0) {
      setAgency(data);
      setActiveRow(data[0]);
    }
  }, [dataIn]);
  return (
    <div
      style={
        isStory
          ? storyStyle
          : {
              height: "100%",
              backgroundColor: "#ffffff",
              borderRadius: "6px",
              overflow: "auto",
            }
      }
      className="shadow-md"
    >
      <InfoBlock
        title="Dienststellen"
        controlBar={
          <ToggleModal
            section="Verwaltungsbereiche"
            name="Dienststellen"
            addRow={addAgency}
            deleteActiveRow={deleteAgency}
          >
            <ModalForm
              updateHandle={editHandle}
              customFields={[
                {
                  title: "Dienststelle",
                  value: activeRow?.agency,
                  id: nanoid(),
                  name: "agency",
                },
                {
                  title: "Gläche in m2",
                  value: activeRow?.area,
                  id: nanoid(),
                  name: "area",
                },
              ]}
              formName={activeRow?.id}
            />
          </ToggleModal>
        }
      >
        <div className="relative">
          <TableCustom
            columns={columns}
            data={agency}
            activeRow={activeRow}
            setActiveRow={setActiveRow}
            fixHeight={true}
          />
        </div>
      </InfoBlock>
    </div>
  );
};
export default Agencies;
Agencies.propTypes = {
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
