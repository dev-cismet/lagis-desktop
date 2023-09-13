import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import { Tabs } from "antd";
import TableCustom from "../ui/tables/TableCustom";
import CustomNotes from "../ui/notes/CustomNotes";
import ToggleModal from "../ui/control-board/ToggleModal";
import ModalForm from "../ui/forms/ModalForm";
import { useEffect, useState } from "react";
import "./operations.css";
import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

const { TabPane } = Tabs;

const columns = [
  {
    title: "Beschlussart",
    dataIndex: "beschlussart",
  },
  {
    title: "Datum",
    dataIndex: "datum",
  },
];
const columnsCosts = [
  {
    title: "Kostenart",
    dataIndex: "kostenart",
  },
  {
    title: "Betrag",
    dataIndex: "betrag",
  },
  {
    title: "Anweisung",
    dataIndex: "anweisung",
  },
];
const CrossReferences = ({
  activeRow,
  dataContract,
  setDataContract,
  setActiveRow,
}) => {
  const contract = dataContract.find((c) => c.key === activeRow?.key);
  const [kosten, setKosten] = useState(activeRow.kosten);
  const [resolution, setResolution] = useState(activeRow.resolution);
  const [activecCosts, setActiveCosts] = useState(activeRow.kosten[0]);
  const [activeResolution, setActiveResolution] = useState(
    activeRow.resolution[0]
  );
  const [activeTabe, setActiveTab] = useState("1");
  const dateFormat = "DD.MM.YYYY";
  const costFields = [
    {
      title: "Kostenart",
      value: activecCosts?.kostenart,
      key: nanoid(),
      name: "kostenart",
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
      title: "Betrag",
      value:
        activecCosts?.betrag === ""
          ? null
          : dayjs(activecCosts?.betrag, dateFormat),
      name: "betrag",
      key: nanoid(),
      type: "date",
    },
    {
      title: "Anweisung",
      key: nanoid(),
      name: "anweisung",
      type: "date",
      value:
        activecCosts?.betrag === ""
          ? null
          : dayjs(activecCosts?.anweisung, dateFormat),
    },
  ];
  const resolutionsFields = [
    {
      title: "Beschlussart",
      value: activeResolution?.beschlussart,
      name: "beschlussart",
      key: nanoid(),
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
      title: "Datum",
      value: activeResolution?.datum,
      value:
        activeResolution?.datum === ""
          ? null
          : dayjs(activeResolution?.datum, dateFormat),
      name: "datum",
      type: "date",
      key: nanoid(),
    },
  ];
  const querverweiseField = [
    {
      title: "Querverweise",
      value: activeRow.querverweise,
      key: nanoid(),
      name: "querverweise",
      type: "note",
    },
  ];
  const handleActiveCosts = (rowObject) => {
    setActiveCosts(rowObject);
  };
  const handleAddRow = () => {
    if (activeTabe === "2") {
      const newData = {
        key: nanoid(),
        kostenart: "",
        betrag: "",
        anweisung: "",
      };
      setKosten((prev) => [...prev, newData]);
      setActiveCosts(newData);
    }

    if (activeTabe === "3") {
      const newData = {
        key: nanoid(),
        beschlussart: "",
        datum: "",
      };
      setResolution((prev) => [...prev, newData]);
      setActiveResolution(newData);
    }
  };
  const handleEditActiveKosten = (updatedObject) => {
    updatedObject.betrag = updatedObject.betrag.format("DD.MM.YYYY");
    updatedObject.anweisung = updatedObject.anweisung.format("DD.MM.YYYY");
    setKosten(
      kosten.map((k) => (k.key === updatedObject.key ? updatedObject : k))
    );
  };
  const handleEditActiveResolution = (updatedObject) => {
    updatedObject.datum = updatedObject.datum.format("DD.MM.YYYY");
    setResolution(
      resolution.map((r) => (r.key === updatedObject.key ? updatedObject : r))
    );
  };
  const deleteActiveRow = () => {
    if (activeTabe === "2" && activecCosts) {
      const updatedArray = kosten.filter((k) => k.key !== activecCosts.key);
      setKosten(updatedArray);
      activecCosts.key !== kosten[0].key
        ? setActiveCosts(kosten[0])
        : setActiveCosts(kosten[1]);
    }
    if (activeTabe === "3" && activeResolution) {
      const updatedArray = resolution.filter(
        (r) => r.key !== activeResolution.key
      );
      setResolution(updatedArray);
      activeResolution.key !== kosten[0].key
        ? setActiveResolution(resolution[0])
        : setActiveResolution(resolution[1]);
    }
  };
  const handleEditNotes = (updatedObject) => {
    const targetRow = dataContract.find((c) => c.key === activeRow.key);
    const copyRow = {
      ...targetRow,
      querverweise: updatedObject.querverweise,
    };
    setActiveRow(copyRow);
    setDataContract(
      dataContract.map((obj) => (obj.key === copyRow.key ? copyRow : obj))
    );
  };
  useEffect(() => {
    setKosten(contract.kosten);
    setResolution(contract.resolution);
  }, [activeRow]);
  return (
    <div
      className="cross-data h-full shadow-md"
      style={{
        height: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "6px",
      }}
    >
      <InfoBlock
        title="QKB"
        controlBar={
          <ToggleModal
            section={
              activeTabe === "1"
                ? "Querverweise"
                : activeTabe === "2"
                ? "Kosten"
                : "Beschlüsse"
            }
            addRow={handleAddRow}
            deleteActiveRow={deleteActiveRow}
          >
            <ModalForm
              updateHandle={
                activeTabe === "1"
                  ? handleEditNotes
                  : activeTabe === "2"
                  ? handleEditActiveKosten
                  : handleEditActiveResolution
              }
              formName={
                activeTabe === "1"
                  ? activeRow.key
                  : activeTabe === "2"
                  ? activecCosts?.key
                  : activeResolution?.key
              }
              customFields={
                activeTabe === "1"
                  ? querverweiseField
                  : activeTabe === "2"
                  ? costFields
                  : resolutionsFields
              }
              size={24}
              buttonPosition={{ justifyContent: "end" }}
              tagsBar={[]}
            />
          </ToggleModal>
        }
      >
        <Tabs
          defaultActiveKey="1"
          size="small"
          style={{ padding: "0 18px" }}
          onChange={(activeKey) => setActiveTab(activeKey)}
        >
          <TabPane tab="Querverweise" key="1">
            <CustomNotes currentText={activeRow.querverweise} />
          </TabPane>
          <TabPane tab="Kosten" key="2">
            <TableCustom
              columns={columnsCosts}
              data={kosten}
              activeRow={activecCosts}
              setActiveRow={handleActiveCosts}
            />
          </TabPane>
          <TabPane tab="Beschlüsse" key="3">
            <TableCustom
              columns={columns}
              data={resolution}
              setActiveRow={setActiveResolution}
              activeRow={activeResolution}
            />
          </TabPane>
        </Tabs>
      </InfoBlock>
    </div>
  );
};

export default CrossReferences;
CrossReferences.propTypes = {
  /**
   * The current main data object that is being used
   */
  dataIn: PropTypes.object,
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
