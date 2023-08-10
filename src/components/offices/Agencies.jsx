import PropTypes from "prop-types";
import { useState } from "react";
import InfoBlock from "../ui/Blocks/InfoBlock";
import { COLOR_LILA, COLOR_AQUA } from "../ui/generalConstant";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableMock from "../ui/tables/TableMock";
import ModalForm from "../ui/forms/ModalForm";
import { useEffect } from "react";
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
            backgroundColor: rowIndex % 2 === 1 ? COLOR_AQUA : COLOR_LILA,
          }}
        ></span>
        <span>{title}</span>
      </div>
    ),
  },
  {
    title: "Gläche in m2",
    dataIndex: "area",
  },
];
const mockExtractor = (input) => {
  return [
    {
      key: "1",
      agency: "12345678910",
      area: 12345678910,
    },
    {
      key: "2",
      agency: "12345678910",
      area: 12345678910,
    },
    {
      key: "3",
      agency: "12345678910",
      area: 12345678910,
    },
    {
      key: "4",
      agency: "12345678910",
      area: 12345678910,
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
  const [activeRow, setActiveRow] = useState("");
  const data = extractor(dataIn);
  const isStory = false;
  const storyStyle = { width, height, ...style };
  useEffect(() => {
    console.log("Active user", activeRow);
  }, [activeRow]);
  return (
    <div
      style={
        isStory
          ? storyStyle
          : { height: "100%", backgroundColor: "#ffffff", borderRadius: "6px" }
      }
      className="shadow-md"
    >
      <InfoBlock
        title="Dienststellen"
        controlBar={
          <ToggleModal
            section="Verwaltungsbereiche"
            name="Dienststellen"
            content={
              <ModalForm
                fields={[
                  {
                    title: "Dienststelle",
                    value: activeRow.agency,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Gläche in m2",
                    value: activeRow.area,
                    rules: [{ required: true }],
                  },
                ]}
                size={24}
              />
            }
          />
        }
      >
        <TableMock columns={columns} data={data} activerow={setActiveRow} />
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
