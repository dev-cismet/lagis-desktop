import { Card, Row, Col } from "antd";
import Typography from "antd/es/typography/Typography";
import PropTypes from "prop-types";
import { PieChartOutlined } from "@ant-design/icons";
import cardsSizes from "../ui/cards-sizes";
import "./style.css";
const {Text} = Typography
const mockExtractor = (input) => {
  return { numberOfDocuments: "1", color: "#F31630" };
};
const DashboardUsage = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  // const {numberSize, numberBottom, titleSize} = {cardsSizes}
  if(width >= 420){

  }
  const data = extractor(dataIn);
  return (
    <div className="dashboard-tile">
      <Card
        style={{
          width,
          height,
          ...style,
        }}
        bodyStyle={{padding: cardsSizes.cardPadding}}
        className="shadow-md"
      >
        <div className="title-row">
          <Row>
            <Col span={12}>
              <Typography style={{ fontSize: cardsSizes.titleSize, fontWeight: "500" }}>
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
          fontSize: cardsSizes.numberSize,
          textAlign: "left",
          width: "100%",
          height: "auto",
          position: "absolute",
          bottom: cardsSizes.numberBottom,
          lineHeight: "1.4"
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
