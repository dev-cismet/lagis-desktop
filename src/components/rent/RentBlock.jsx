import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableCustom from "../ui/tables/TableCustom";
import ModalForm from "../ui/forms/ModalForm";
import { Row, Col, Tag } from "antd";
import CustomNotes from "../ui/notes/CustomNotes";
import CustomH3 from "../ui/titles/CustomH3";
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
    title: "Lage",
    dataIndex: "lage",
  },
  {
    title: "Aktenzeichen",
    dataIndex: "aktenzeichen",
  },
  {
    title: "Fläche m2",
    dataIndex: "fläche",
  },
  {
    title: "Nutzung",
    dataIndex: "nutzung",
  },
  {
    title: "Vertragsbegin",
    dataIndex: "vertragsbegin",
  },
  {
    title: "Vertragsende",
    dataIndex: "vertragsende",
  },
  {
    title: "Merkmale",
    dataIndex: "merkmale",
    key: "merkmale",
    render: (merkmale) => (
      <>
        {merkmale.map((m, i) => (
          <Tag key={i} color={m.color}>
            {m.text}
          </Tag>
        ))}
      </>
    ),
  },
];
const mockExtractor = (input) => {
  return [
    {
      key: "1",
      lage: "Luntenbecker",
      aktenzeichen: "3434534",
      fläche: "237",
      nutzung: "Other",
      vertragsbegin: "02.05.2023",
      vertragsende: "02.05.2023",
      merkmale: [
        { text: "Altlast", color: "gold" },
        { text: "Biotop", color: "cyan" },
      ],
    },
    {
      key: "2",
      lage: "Luntenbecker",
      aktenzeichen: "3434534",
      fläche: "237",
      nutzung: "Other",
      vertragsbegin: "02.05.2023",
      vertragsende: "02.05.2023",
      merkmale: [{ text: "Unentgeltlich", color: "gold" }],
    },
    {
      key: "3",
      lage: "Luntenbecker",
      aktenzeichen: "3434534",
      fläche: "237",
      nutzung: "Other",
      vertragsbegin: "02.05.2023",
      vertragsende: "02.05.2023",
      merkmale: [{ text: "keine Akte", color: "cyan" }],
    },
    {
      key: "4",
      lage: "Luntenbecker",
      aktenzeichen: "3434534",
      fläche: "237",
      nutzung: "Other",
      vertragsbegin: "02.05.2023",
      vertragsende: "02.05.2023",
      merkmale: [
        { text: "Altlast", color: "gold" },
        { text: "keine Akte", color: "cyan" },
      ],
    },
  ];
};
const RentBlock = ({
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
  const [rents, setRents] = useState(data);
  const [activeRow, setActiveRow] = useState(rents[0]);
  const addRow = () => {
    const newRow = {
      key: nanoid(),
      lage: "",
      aktenzeichen: "",
      fläche: "",
      nutzung: "",
      vertragsbegin: "",
      vertragsende: "",
      merkmale: [
        { text: "", color: "gold" },
        { text: "", color: "cyan" },
      ],
    };
    setRents((prev) => [...prev, newRow]);
    setActiveRow(newRow);
  };
  const deleteRow = () => {
    const updatedArray = rents.filter((row) => row.key !== activeRow?.key);
    setRents(updatedArray);
    if (activeRow?.key === rents[0].key) {
      setActiveRow(rents[1]);
    } else {
      setActiveRow(rents[0]);
    }
  };
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
    >
      <InfoBlock
        title="Miet und Pachtverträge"
        controlBar={
          <ToggleModal
            section="Vermietung / Verpachtung"
            modalWidth={900}
            addRow={addRow}
            deleteActiveRow={deleteRow}
          >
            <ModalForm
              formName={activeRow?.key}
              customFields={[
                {
                  title: "Lage",
                  value: activeRow?.lage,
                  key: nanoid(),
                  name: "lage",
                },
                {
                  title: "Aktenzeichen",
                  value: activeRow?.aktenzeichen,
                  key: nanoid(),
                  name: "aktenzeichen",
                },
                {
                  title: "Fläche m2",
                  value: activeRow?.fläche,
                  key: nanoid(),
                  name: "fläche",
                },
                {
                  title: "Nutzung",
                  value: activeRow?.nutzung,
                  key: nanoid(),
                  name: "aktenzeichen",
                },
                {
                  title: "Vertragsbegin",
                  key: nanoid(),
                  value:
                    activeRow?.vertragsbegin === ""
                      ? null
                      : dayjs(activeRow?.vertragsbegin, dateFormat),
                  name: "nutzung",
                  type: "date",
                },
                {
                  title: "Vertragsende",
                  key: nanoid(),
                  name: "vertragsende",
                  value:
                    activeRow?.vertragsende === ""
                      ? null
                      : dayjs(activeRow?.vertragsende, dateFormat),
                  type: "date",
                },
              ]}
              size={8}
              buttonPosition={{ justifyContent: "end" }}
              tagsBar={[1]}
            />
          </ToggleModal>
        }
      >
        <TableCustom
          columns={columns}
          data={rents}
          activeRow={activeRow}
          setActiveRow={setActiveRow}
        />
        <Row gutter={[8, 0]}>
          <Col span={12}>
            <div className="">
              <CustomH3 title="Bemerkung" styles={{ marginLeft: "10px" }} />
              <CustomNotes styles={"p-2"} />
            </div>
          </Col>
          <Col span={12}>
            <div className="">
              <CustomH3 title="Querverweise" styles={{ marginLeft: "10px" }} />
              <CustomNotes styles="p-2" />
            </div>
          </Col>
        </Row>
      </InfoBlock>
    </div>
  );
};

export default RentBlock;
RentBlock.propTypes = {
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
