import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import { Tabs } from "antd";
import TableMock from "../ui/tables/TableMock";
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
const mockExtractor = (input) => {
  return {
    resolution: [
      {
        key: "1",
        beschlussart: "1237563255",
        datum: "02.05.2023",
      },
      {
        key: "2",
        beschlussart: "1237563255",
        datum: "02.05.2023",
      },
      {
        key: "3",
        beschlussart: "1237563255",
        datum: "02.05.2023",
      },
      {
        key: "4",
        beschlussart: "1237563255",
        datum: "02.05.2023",
      },
    ],
    costs: [
      {
        key: "1",
        kostenart: "1237563255",
        betrag: "02.05.2023",
        anweisung: "02.05.2023",
      },
      {
        key: "2",
        kostenart: "1237563255",
        betrag: "02.05.2023",
        anweisung: "02.05.2023",
      },
      {
        key: "3",
        beschlussart: "1237563255",
        kostenart: "1237563255",
        betrag: "02.05.2023",
        anweisung: "02.05.2023",
      },
      {
        key: "4",
        beschlussart: "1237563255",
        kostenart: "1237563255",
        betrag: "02.05.2023",
        anweisung: "02.05.2023",
      },
    ],
  };
};
const CrossReferences = ({
  dataIn,
  extractor = mockExtractor,
  activeRow,
  dataContract,
}) => {
  const contract = dataContract.find((c) => c.key === activeRow?.key);
  const [kosten, setKosten] = useState(null);
  const [activecCosts, setActiveCosts] = useState({});
  const [activeResolution, setActiveResolution] = useState({});
  const [activeTabe, setActiveTab] = useState("1");
  const data = extractor(dataIn);
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
      value: dayjs(activecCosts?.betrag, dateFormat),
      name: "betrag",
      key: nanoid(),
      type: "date",
    },
    {
      title: "Anweisung",
      key: nanoid(),
      name: "anweisung",
      value: activecCosts?.anweisung,
    },
  ];
  const resolutionsFields = [
    {
      title: "Beschlussart",
      value: activeResolution.beschlussart,
      rules: [{ required: true }],
    },
    {
      title: "Datum",
      value: activeResolution.datum,
      rules: [{ required: true }],
    },
  ];
  const handleActiveCosts = (rowObject) => {
    setActiveCosts(rowObject);
  };
  const handleAddCostenRow = () => {
    const newData = {
      key: nanoid(),
      kostenart: "",
      betrag: "",
      anweisung: "",
    };
    setKosten((prev) => [...prev, newData]);
  };
  useEffect(() => {
    activeRow ? setKosten(contract.kosten) : setKosten(null);
  }, [activeRow]);
  return (
    <div
      className="cross-data shadow-md"
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
            section={activeTabe === "3" ? "Beschlüsse" : "Kosten"}
            addRow={handleAddCostenRow}
            showModalButton={activeTabe === "1" ? false : true}
            isActiveRow={activecCosts || activeResolution ? true : false}
          >
            <ModalForm
              customFields={activeTabe === "3" ? resolutionsFields : costFields}
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
            <CustomNotes />
          </TabPane>
          <TabPane tab="Kosten" key="2">
            <TableMock
              columns={columnsCosts}
              data={kosten}
              activeRow={activecCosts}
              setActiveRow={handleActiveCosts}
            />
          </TabPane>
          <TabPane tab="Beschlüsse" key="3">
            <TableMock
              columns={columns}
              data={data.resolution}
              activerow={setActiveResolution}
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
