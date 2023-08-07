import { FolderOpenOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import OverviewCard from "../ui/OverviewCard";
import "./style.css";

const mockExtractor = (input) => {
  return [
    { title: "104.2", color: "#0097FA", size: 250 },
    { title: "403.4", color: "#6254EA", size: 50 },
  ];
};
const DashboardOffices = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  let square = "14ppx";
  const data = extractor(dataIn);
  return (
    <div className="dashboard-tile">
      <OverviewCard
        title="Verwaltungsbereiche"
        subtitle="& Rollen"
        icon={<FolderOpenOutlined style={{ color: "#0097FA" }} />}
      >
        <div className="flex flex-col mt-auto">
          {data.map((item) => (
            <div className="flex justify-between items-center mt-1 mb-1">
              <div className="flex justify-between items-center">
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    marginRight: "6px",
                    backgroundColor: item.color,
                  }}
                ></span>
                <span
                  style={{ color: item.color }}
                  className="font-bold text-medium"
                >
                  {item.title}
                </span>
              </div>
              <span
                style={{
                  color: "#6C6A6A",
                  fontSize: square,
                }}
                className="font-base"
              >
                {item.size} m²
              </span>
            </div>
          ))}
        </div>
      </OverviewCard>
    </div>
  );
};
export default DashboardOffices;

DashboardOffices.propTypes = {
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
