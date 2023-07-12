import Typography from "antd/es/typography/Typography";
import { FolderOpenOutlined } from "@ant-design/icons";

import { Card, Row, Col } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";

const mockExtractor = (input) => {
  return [
    { title: "104.2", color: "#0097FA", size: 250 },
    { title: "403.4", color: "#6254EA", size: 50 },
  ];
};
const DashboardOffices = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height,
}) => {
  const data = extractor(dataIn);
  return (
    <div className="dashboard-tile">
      <Card
        style={{
          width,
          height,
        }}
      >
        <div className="title-row" style={{ marginBottom: "10px" }}>
          <Row>
            <Col span={12}>
              <Typography style={{ fontSize: "18px", fontWeight: "350" }}>
                Offices & Roles
              </Typography>
            </Col>
            <Col span={12}>
              <div className="dashboard-icon">
                <FolderOpenOutlined
                  style={{ fontSize: "25px", color: "#0092FA" }}
                />
                {/* an alternative icon */}
                {/* <FontAwesomeIcon
                style={{ fontSize: "25px", color: "#0092FA" }}
                icon={faFolderOpen}
              /> */}
              </div>
            </Col>
          </Row>
        </div>

        {data.map((item) => (
          <div>
            <span style={{ color: item.color }}>{item.title}</span>
            {"  "}
            <span>{item.size} m²</span>
          </div>
        ))}
      </Card>
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
