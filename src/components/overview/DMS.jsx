import { Card, Row, Col } from "antd";
import Typography from "antd/es/typography/Typography";
import PropTypes from "prop-types";
import { FilePdfOutlined } from "@ant-design/icons";
import { Textfit } from "react-textfit";

import "./style.css";
const mockExtractor = (input) => {
  return { numberOfDocuments: "3", color: "#262626" };
};
const DashboardDMS = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 180,
  style,
}) => {
  const data = extractor(dataIn);
  console.log("DMS props", { width, height });

  return (
    <div className="dashboard-tile">
      <Card
        style={{
          width,
          height,
          ...style,
        }}
      >
        <div
          className="title-row"
          style={{ marginBottom: "10px", zIndex: "100" }}
        >
          <Row>
            <Col span={12}>
              <Typography style={{ fontSize: "18px", fontWeight: "350" }}>
                DMS
              </Typography>
            </Col>
            <Col span={12}>
              <div className="dashboard-icon">
                <FilePdfOutlined
                  style={{ fontSize: "25px", color: "#262626" }}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div
          style={{
            color: data.color,
            fontSize: "100px",
            textAlign: "center",
            width: "100%",
            height: "80%",
            position: "absolute",
            bottom: "0px",
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
