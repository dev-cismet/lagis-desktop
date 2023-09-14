import PropTypes from "prop-types";
import { DollarOutlined } from "@ant-design/icons";
import OverviewCard from "../ui/OverviewCard";
import "./style.css";
import { Link } from "react-router-dom";
const mockExtractor = (input) => {
  return { numberOfRents: "7", color: "#5D5FEF" };
};
const DashboardRent = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  const data = extractor(dataIn);
  return (
    <div className="dashboard-tile">
      <Link to="/miet">
        <OverviewCard
          title="Miet und Pachtverträge"
          icon={<DollarOutlined style={{ color: data.color }} />}
        >
          <div
            className="text-8xl"
            style={{
              color: data.color,
              textAlign: "left",
              width: "100%",
              lineHeight: "1.2",
            }}
          >
            <strong>{data.numberOfRents.toString().padStart(2, "0")}</strong>
          </div>
        </OverviewCard>
      </Link>
    </div>
  );
};
export default DashboardRent;

DashboardRent.propTypes = {
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
