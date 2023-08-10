import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableMock from "../ui/tables/TableMock";
import ModalForm from "../ui/forms/ModalForm";
import DocsIcons from "../ui/Blocks/DocsIcons";
import { useState } from "react";
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
      key: "1",
      vertragsart: "text 1",
      nummer: "Nummer 1",
      quadratmeterpreis: "",
      kaufpreis: "",
    },
    {
      key: "2",
      vertragsart: "text 2",
      nummer: "Nummer 2",
      quadratmeterpreis: "",
      kaufpreis: "",
    },
    {
      key: "3",
      vertragsart: "text 3",
      nummer: "Nummer 3",
      quadratmeterpreis: "",
      kaufpreis: "",
    },
    {
      key: "4",
      vertragsart: "text 4",
      nummer: "Nummer 4",
      quadratmeterpreis: "",
      kaufpreis: "",
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
        title="Vorgänge"
        controlBar={
          <ToggleModal
            section="Verträge"
            content={
              <ModalForm
                fields={[
                  {
                    title: "Vertragsart",
                    value: activeRow.vertragsart,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Nummer",
                    value: activeRow.nummer,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Quadratmeterpreis",
                    value: activeRow.quadratmeterpreis,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Kaufpreis (i. NK)",
                    value: activeRow.kaufpreis,
                    rules: [{ required: true }],
                  },
                ]}
                size={8}
                buttonPosition={{ justifyContent: "end" }}
                tagsBar={[]}
              />
            }
            modalWidth={900}
          >
            <DocsIcons />
          </ToggleModal>
        }
      >
        <TableMock columns={columns} data={data} activerow={setActiveRow} />
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
