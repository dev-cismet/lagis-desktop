import PropTypes from "prop-types";
import { FieldTimeOutlined } from "@ant-design/icons";
import OverviewCard from "../ui/OverviewCard";
import "./style.css";
import { Link } from "react-router-dom";
import { buildUrlParams } from "../../core/tools/helper";

const mockExtractor = (input) => {
  return { numberOfDocuments: "4", color: "#FFD029" };
};
const DashboardHistory = ({
  dataIn,
  extractor = mockExtractor,
  parametersForLink,
  width = 231,
  height = 188,
  style,
}) => {
  const data = extractor(dataIn);
  return (
    <div className="dashboard-tile">
      <Link to={`/historie?${buildUrlParams(parametersForLink)}`}>
        <OverviewCard
          title="Historie"
          icon={<FieldTimeOutlined style={{ color: data.color }} />}
        >
          <div
            style={{
              color: data.color,
              fontSize: "5.5rem",
              textAlign: "left",
              width: "100%",
              lineHeight: "1.2",
            }}
          >
            <strong>
              {data.numberOfDocuments.toString().padStart(2, "0")}
            </strong>
          </div>
        </OverviewCard>
      </Link>
    </div>
  );
};
export default DashboardHistory;

DashboardHistory.propTypes = {
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
