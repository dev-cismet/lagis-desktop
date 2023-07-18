import { Card, Row, Col } from "antd";
import Typography from "antd/es/typography/Typography";
import PropTypes from "prop-types";
import { PieChartOutlined } from "@ant-design/icons";
import "./style.css";
const {Text} = Typography
const mockExtractor = (input) => {
  return { numberOfDocuments: "1", color: "#F31630" };
};
const DashboardUsage = ({
  dataIn,
  extractor = mockExtractor,
  width = 214,
  height = 190,
}) => {
  let fontSize = "100px"
  if(width >= 420){
    fontSize = "180px"
  }
  const data = extractor(dataIn);
  return (
    <div className="dashboard-tile">
      <Card
        style={{
          width,
          height,
        }}
        bodyStyle={{padding: "14px"}}
        className="shadow-md"
      >
        <div 
          className="title-row"
          >
          <Row>
            <Col span={12}>
              <Typography style={{ fontSize: "18px", fontWeight: "500" }}>
                Usage
              </Typography>
            </Col>
            <Col span={12}>
              <div className="dashboard-icon">
                <PieChartOutlined
                  style={{ fontSize: "25px", color: "#F31630" }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text style={{fontSize: "13px", color: "#6C6A6A"}}>
                & Asset Accounting
              </Text>
            </Col>
          </Row>
        </div>
        <div 
         style={{
          color: data.color,
          fontSize: fontSize,
          textAlign: "left",
          width: "100%",
          height: "auto",
          position: "absolute",
          bottom: "0px",
          lineHeight: "1.3"
        }}
      >
          <strong>{data.numberOfDocuments.toString().padStart(2, "0")}</strong>
        </div>
      </Card>
    </div>
  );
};
export default DashboardUsage;

DashboardUsage.propTypes = {
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
