import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableCustom from "../ui/tables/TableCustom";
import ModalForm from "../ui/forms/ModalForm";
import DocsIcons from "../ui/Blocks/DocsIcons";
import { useState } from "react";
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
  {
    title: "Nutzungsart",
    dataIndex: "nutzungsart",
  },
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
      bezeichnung: "Verkehr - Fahrweg",
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
      bezeichnung: "Verkehr - Fahrweg",
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
      bezeichnung: "Verkehr - Fahrweg",
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
      bezeichnung: "Verkehr - Fahrweg",
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
  const [activeRow, setActiveRow] = useState({});
  const data = extractor(dataIn);
  const isStory = false;
  const storyStyle = { width, height, ...style };
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
            content={
              <ModalForm
                fields={[
                  {
                    title: "Nutzung Nr",
                    value: activeRow.nutzung,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Buchungs-Nr",
                    value: activeRow.buchungs,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Anlageklasse",
                    value: activeRow.anlageklasse,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Nutzungsart",
                    value: activeRow.nutzungsart,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Nutzungsarten-bezeichnung",
                    value: activeRow.bezeichnung,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Fläche/m2",
                    value: activeRow.fläche,
                    rules: [{ required: true }],
                  },
                  {
                    title: "m2 Preis",
                    value: activeRow.preis,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Gesamtpreis",
                    value: activeRow.gesamtpreis,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Buchwert",
                    value: activeRow.buchwert,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Stille Reserve",
                    value: activeRow.stille,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Bemerkung",
                    value: activeRow.bemerkung,
                    rules: [{ required: true }],
                  },
                ]}
                size={8}
                buttonPosition={{ justifyContent: "end" }}
              />
            }
            modalWidth={900}
          >
            <DocsIcons classnames="mr-4" />
          </ToggleModal>
        }
      >
        <TableCustom
          columns={columns}
          data={data}
          activerow={setActiveRow}
          addClass="nfk-cover"
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
