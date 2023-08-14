import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import { ReloadOutlined } from "@ant-design/icons";
import ToggleModal from "../ui/control-board/ToggleModal";
import TableMock from "../ui/tables/TableMock";
import ModalForm from "../ui/forms/ModalForm";
import { useState } from "react";
import "./offices.css";
const columns = [
  {
    title: "Street",
    dataIndex: "street",
  },
  {
    title: "Length",
    dataIndex: "length",
  },
];
const mockExtractor = (input) => {
  return [
    {
      key: "1",
      street: "12345678910",
      length: "02.05.2023",
    },
    {
      key: "2",
      street: "12345678910",
      length: "02.05.2023",
    },
    {
      key: "3",
      street: "12345678910",
      length: "02.05.2023",
    },
    {
      key: "4",
      street: "12345678910",
      length: "02.05.2023",
    },
  ];
};
const Streetfronts = ({
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
      className="shadow-md"
      style={
        isStory
          ? storyStyle
          : { height: "100%", borderRadius: "6px", backgroundColor: "#ffffff" }
      }
    >
      <InfoBlock
        title="Straßenfronten"
        controlBar={
          <ToggleModal
            section="Verwaltungsbereiche"
            name="Straßenfronten"
            content={
              <ModalForm
                fields={[
                  {
                    title: "Straßen",
                    value: activeRow.street,
                    rules: [{ required: true }],
                  },
                  {
                    title: "Length",
                    value: activeRow.length,
                    rules: [{ required: true }],
                  },
                ]}
              />
            }
          >
            <ReloadOutlined
              className="reload-button"
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#DDE2E8",
                borderRadius: "2px",
                lineHeight: "18px",
                textAlign: "center",
                fontSize: "8px",
              }}
            />
          </ToggleModal>
        }
      >
        <TableMock columns={columns} data={data} activerow={setActiveRow} />
      </InfoBlock>
    </div>
  );
};
export default Streetfronts;
Streetfronts.propTypes = {
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
