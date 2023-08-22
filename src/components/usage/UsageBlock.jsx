import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableCustom from "../ui/tables/TableCustom";
import ModalForm from "../ui/forms/ModalForm";
import DocsIcons from "../ui/Blocks/DocsIcons";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
const columns = [
  {
    title: "Nutzung Nr",
    dataIndex: "nutzung",
  },
  {
    title: "Buchungs-Nr",
    dataIndex: "buchungs",
  },
  {
    title: "Anlageklasse",
    dataIndex: "anlageklasse",
  },
  // {
  //   title: "Nutzungsart",
  //   dataIndex: "nutzungsart",
  // },
  {
    title: "Nutzungsarten-bezeichnung",
    dataIndex: "bezeichnung",
  },
  {
    title: "Fläche/m2",
    dataIndex: "fläche",
  },
  {
    title: "m2 Preis",
    dataIndex: "preis",
  },
  {
    title: "Gesamtpreis",
    dataIndex: "gesamtpreis",
  },
  {
    title: "Stille Reserve",
    dataIndex: "stille",
  },
  {
    title: "Buchwert",
    dataIndex: "buchwert",
  },
  {
    title: "Bemerkung",
    dataIndex: "bemerkung",
  },
];
const mockExtractor = (input) => {
  return [
    {
      key: "1",
      nutzung: "237284656",
      buchungs: "1",
      anlageklasse: "Infrastrukturvermögen Grundstücke",
      nutzungsart: "3273-12376",
      bezeichnung: "3273-12376",
      fläche: "2132",
      preis: "38274€",
      gesamtpreis: "38274€",
      stille: "Stille 1",
      buchwert: "Buchwert 1",
      bemerkung: "Bemerkung 1",
    },
    {
      key: "2",
      nutzung: "746",
      buchungs: "1",
      anlageklasse: "Infrastrukturvermögen Grundstücke",
      nutzungsart: "3273-12376",
      bezeichnung: "3273-12376",
      fläche: "2132",
      preis: "38274€",
      gesamtpreis: "38274€",
      stille: "",
      buchwert: "",
      bemerkung: "",
    },
    {
      key: "3",
      nutzung: "2372846",
      buchungs: "1",
      anlageklasse: "Infrastrukturvermögen Grundstücke",
      nutzungsart: "3273-12376",
      bezeichnung: "3273-12376",
      fläche: "2132",
      preis: "38274€",
      gesamtpreis: "38274€",
      stille: "",
      buchwert: "",
      bemerkung: "",
    },
    {
      key: "4",
      nutzung: "2372846",
      buchungs: "1",
      anlageklasse: "Infrastrukturvermögen Grundstücke",
      nutzungsart: "3273-12376",
      bezeichnung: "3273-12376",
      fläche: "2132",
      preis: "38274€",
      gesamtpreis: "38274€",
      stille: "",
      buchwert: "",
      bemerkung: "",
    },
  ];
};

const UsageBlock = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  const data = extractor(dataIn);
  const isStory = false;
  const storyStyle = { width, height, ...style };
  const [usage, setUsage] = useState(data);
  const [activeRow, setActiveRow] = useState(usage[0]);
  const addRow = () => {
    const newRow = {
      key: nanoid(),
      nutzung: "",
      buchungs: "",
      anlageklasse: "",
      nutzungsart: "",
      bezeichnung: "",
      fläche: "",
      preis: "",
      gesamtpreis: "",
      stille: "",
      buchwert: "",
      bemerkung: "",
    };
    setUsage((prev) => [...prev, newRow]);
    setActiveRow(newRow);
  };
  const deleteRow = () => {
    console.log("11111111");
    const updatedArray = usage.filter((row) => row.key !== activeRow?.key);
    setUsage(updatedArray);
    if (activeRow?.key === usage[0].key) {
      setActiveRow(usage[1]);
    } else {
      setActiveRow(usage[0]);
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
      className="shadow-md"
    >
      <InfoBlock
        title="Nutzung"
        controlBar={
          <ToggleModal
            section="Nutzung"
            addRow={addRow}
            deleteActiveRow={deleteRow}
            content={<DocsIcons classnames="mr-4 flex gap-1" />}
            modalWidth={900}
          >
            <ModalForm
              formName={activeRow?.key}
              customFields={[
                {
                  title: "Nutzung Nr",
                  value: activeRow?.nutzung,
                  key: nanoid(),
                  name: "nutzung",
                },
                {
                  title: "Buchungs-Nr",
                  value: activeRow?.buchungs,
                  key: nanoid(),
                  name: "buchungs",
                },
                {
                  title: "Anlageklasse",
                  value: activeRow?.anlageklasse,
                  key: nanoid(),
                  name: "anlageklasse",
                },
                // {
                //   title: "Nutzungsart",
                //   value: activeRow?.nutzungsart,
                //   key: nanoid(),
                //   name: "nutzungsart",
                // },
                {
                  title: "Nutzungsarten-bezeichnung",
                  value: activeRow?.bezeichnung,
                  key: nanoid(),
                  name: "bezeichnung",
                },
                {
                  title: "Fläche/m2",
                  value: activeRow?.fläche,
                  key: nanoid(),
                  name: "fläche",
                },
                {
                  title: "m2 Preis",
                  value: activeRow?.preis,
                  key: nanoid(),
                  name: "preis",
                },
                {
                  title: "Gesamtpreis",
                  value: activeRow?.gesamtpreis,
                  key: nanoid(),
                  name: "gesamtpreis",
                },
                {
                  title: "Buchwert",
                  value: activeRow?.buchwert,
                  key: nanoid(),
                  name: "buchwert",
                },
                {
                  title: "Stille Reserve",
                  value: activeRow?.stille,
                  key: nanoid(),
                  name: "stille",
                },
                {
                  title: "Bemerkung",
                  value: activeRow?.bemerkung,
                  key: nanoid(),
                  name: "bemerkung",
                  type: "note",
                },
              ]}
              size={8}
              buttonPosition={{ justifyContent: "end" }}
            />
          </ToggleModal>
        }
      >
        <TableCustom
          columns={columns}
          data={usage}
          activerow={setActiveRow}
          addClass="nfk-cover"
          activeRow={activeRow}
          setActiveRow={setActiveRow}
        />
      </InfoBlock>
    </div>
  );
};

export default UsageBlock;
UsageBlock.propTypes = {
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
