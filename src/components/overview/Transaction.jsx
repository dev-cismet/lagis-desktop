import { Card, Row, Col } from "antd";
import Typography from "antd/es/typography/Typography";
import PropTypes from "prop-types";
import { PayCircleOutlined } from "@ant-design/icons";

import "./style.css";
const mockExtractor = (input) => {
  return { numberOfDocuments: "3", color: "#389EFD" };
};
const DashboardTransaction = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  numberSize = "90px",
  titleSize = "20px",
  subtitle = "13px",
  iconSize = "25px",
  cardPading = "18px",
  style,
}) => {
  if(width >= 330){
    numberSize = "120px"
    titleSize = "28px"
    subtitle = "18px"
    iconSize = "40px";
    cardPading = "18px"
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
        bodyStyle={{padding: cardPading}}
        className="shadow-md"
      >
        <div
          className="title-row"
          style={{ marginBottom: "10px", zIndex: "100" }}
        >
          <Row>
            <Col span={20}>
              <Typography 
                style={{ 
                    fontSize: titleSize, 
                    fontWeight: "500",
                    lineHeight: "1.2",
                    }}>
                Transaction Number
              </Typography>
            </Col>
            <Col span={4}>
              <div className="dashboard-icon">
                <PayCircleOutlined
                  style={{ fontSize: iconSize, color: "#389EFD" }}
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
            bottom: "-5px",
            lineHeight: "1.4"
          }}
        >
          <strong>{data.numberOfDocuments.toString().padStart(2, "0")}</strong>
        </div>
      </Card>
    </div>
  );
};
export default DashboardTransaction;

DashboardTransaction.propTypes = {
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
