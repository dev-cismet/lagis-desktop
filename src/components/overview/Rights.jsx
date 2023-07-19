import { Card, Row, Col } from "antd";
import Typography from "antd/es/typography/Typography";
import PropTypes from "prop-types";
import { SettingOutlined } from "@ant-design/icons";
import "./style.css";
const {Text} = Typography
const mockExtractor = (input) => {
  return { numberOfDocuments: "3", color: "#EF5DA8" };
};
const DashboardDMS = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  variant
}) => {
  let fontSize = "90px";
  let titleSize = "20px";
  let subtitle = "13px";
  let iconSize = "25px";
  let cardPading = "10px";
  if(width >= 340){
    fontSize = "120px"
    titleSize = "28px"
    subtitle = "18px"
    iconSize = "40px";
    cardPading = "18px"
  }
  const data = extractor(dataIn);
  return (
    <div className="dashboard-tile">
      <Card
        style={{
          width,
          height,
        }}
        bodyStyle={{padding: cardPading}}
        className="shadow-md"
      >
        <div className="title-row">
          <Row>
            <Col 
              span={20}
              >
              <Typography 
                style={{ 
                  fontSize: titleSize,
                  fontWeight: "500",
                  lineHeight: "1.3",
                  }}
              >
                Right <br/> & Encumbarances
              </Typography>
            </Col>
            <Col span={4}>
              <div className="dashboard-icon">
                <SettingOutlined
                  style={{ fontSize: iconSize, color: "#EF5DA8" }}
                  className="ml-auto mt-1"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="mt-1">
              <Text style={{fontSize: subtitle, color: "#6C6A6A"}}>
                Easements, Building encumbrances
              </Text>
            </Col>
          </Row>
        </div>
        <div 
            style={{
            color: data.color,
            fontSize,
            textAlign: "left",
            width: "100%",
            height: "auto",
            position: "absolute",
            bottom: "-5px",
            lineHeight: "1.4",
            fontWeight: "700",
          }}
        >
          <span>{data.numberOfDocuments.toString().padStart(2, "0")}</span>
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
