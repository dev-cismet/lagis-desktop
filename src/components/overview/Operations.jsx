import { Card, Row, Col } from "antd";
import Typography from "antd/es/typography/Typography";
import PropTypes from "prop-types";
import { SwapRightOutlined } from "@ant-design/icons";
import cardsSizes from "../ui/cards-sizes";
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
  const {
    numberSize, 
    numberBottom, 
    titleSize, 
    iconSize,
    cardPadding
  } = {...cardsSizes}

  if(width >= 330){

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
        bodyStyle={{padding: cardPadding}}
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
