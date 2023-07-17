import { Card, Row, Col } from "antd";
import Typography from "antd/es/typography/Typography";
import PropTypes from "prop-types";
import { SettingOutlined } from "@ant-design/icons";
import "./style.css";
const mockExtractor = (input) => {
  return { numberOfDocuments: "3", color: "#EF5DA8" };
};
const DashboardDMS = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 180,
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
                Right & Encumbarances
              </Typography>
            </Col>
            <Col span={12}>
              <div className="dashboard-icon">
                <SettingOutlined
                  style={{ fontSize: "25px", color: "#EF5DA8" }}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div 
            style={{
            color: data.color,
            fontSize: "100px",
            textAlign: "left",
            width: "100%",
            height: "auto",
            position: "absolute",
            bottom: "0px",
            lineHeight: "1.4"
          }}
        >
          <strong>{data.numberOfDocuments.toString().padStart(2, "0")}</strong>
        </div>
      </Card>
    </div>
  );
};
export default DashboardDMS;

DashboardDMS.propTypes = {
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
