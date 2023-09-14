import PropTypes from "prop-types";
import { SettingOutlined } from "@ant-design/icons";
import OverviewCard from "../ui/OverviewCard";
import "./style.css";
import { Link } from "react-router-dom";
const mockExtractor = (input) => {
  return { numberOfRights: "3", color: "#EF5DA8" };
};
const DashboardRights = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
  variant,
}) => {
  const data = extractor(dataIn);
  return (
    <div className="dashboard-tile">
      <Link to="/rechte">
        <OverviewCard
          title="Rechte & Belastungen"
          subtitle="& Dienstbarkeiten, Baulasten"
          icon={
            <SettingOutlined
              className="text-3xl"
              style={{ color: data.color }}
            />
          }
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
            <strong>{data.numberOfRights.toString().padStart(2, "0")}</strong>
          </div>
        </OverviewCard>
      </Link>
    </div>
  );
};
export default DashboardRights;

DashboardRights.propTypes = {
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
