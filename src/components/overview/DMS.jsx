import { Card, Row, Col } from "antd";
import Typography from "antd/es/typography/Typography";
import PropTypes from "prop-types";
import { FilePdfOutlined } from "@ant-design/icons";
import cardsSizes from "../ui/cards-sizes";
import "./style.css";
const mockExtractor = (input) => {
  return { numberOfDocuments: "3", color: "#180E53" };
};
const DashboardDMS = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  const {
    numberSize, 
    numberBottom, 
    titleSize, 
    iconSize,
    cardPadding
  } = {...cardsSizes}
  if(width >= 340){
  }
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
        bodyStyle={{padding: cardPadding}}
        className="shadow-md"
      >
        <div
          className="title-row"
        >
          <Row>
            <Col span={12}>
              <Typography 
                style={{ 
                  fontSize: titleSize,
                  fontWeight: "500",
                  lineHeight: "1.3",
                  }}              
              >
                DMS
              </Typography>
            </Col>
            <Col span={12}>
              <div className="dashboard-icon">
                <FilePdfOutlined
                  style={{ fontSize: iconSize, color: "#262626" }}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div
          style={{
            color: data.color,
            fontSize: numberSize,
            textAlign: "left",
            width: "100%",
            height: "auto",
            position: "absolute",
            bottom: numberBottom,
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
