import { Card, Row, Col } from "antd";
import Typography from "antd/es/typography/Typography";
import PropTypes from "prop-types";
import { SwapRightOutlined } from "@ant-design/icons";
import "./style.css";

const mockExtractor = (input) => {
  return { numberOfDocuments: "0", color: "#FF7A00" };
};
const DashboarOperations = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  let fontSize = "90px";
  let titleSize = "20px";
  let subtitle = "13px";
  let iconSize = "25px";
  let cardPading = "10px";
  if(width >= 330){
    fontSize = "140px"
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
          ...style
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
                Operations
              </Typography>
            </Col>
            <Col span={4}>
              <div className="dashboard-icon">
                <SwapRightOutlined
                  style={{ fontSize: iconSize, color: "#FF7A00" }}
                  className="ml-auto mt-1"
                />
              </div>
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
export default DashboarOperations;

DashboarOperations.propTypes = {
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
