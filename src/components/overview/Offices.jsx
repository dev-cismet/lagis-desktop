import Typography from "antd/es/typography/Typography";
import { FolderOpenOutlined } from "@ant-design/icons";
import { Card, Row, Col } from "antd";
import PropTypes from "prop-types";
const {Text} = Typography
import "./style.css"

const mockExtractor = (input) => {
  return [
    { title: "104.2", color: "#0097FA", size: 250 },
    { title: "403.4", color: "#6254EA", size: 50 },
    // { title: "570.4", color: "#2354EA", size: 150 },
  ];
};
const DashboardOffices = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
}) => {
  let titleSize = "20px";
  let subtitle = "13px";
  let iconSize = "25px";
  let cardPading = "16px";
  let numbers = "18px"
  let square = "14ppx"
  let namGabs = "4px"
  if(width >= 340){
    titleSize = "28px"
    subtitle = "18px"
    iconSize = "40px"
    cardPading = "18px"
    numbers = "24px"
    square = "18px"
    namGabs = "18px"
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
        bodyStyle={{
          padding: cardPading,
          border: "none",
        }}
        className="shadow-md"
        actions={[
          <div className="flex flex-col"
            style={{
              padding: cardPading, 
              paddingTop: "0", 
              paddingBottom: "0",
            }}
          >
          {data.map((item) => (
            <div 
              className="flex justify-between items-center"
              style={{
                marginTop: namGabs,
                marginBottom: namGabs,
              }}
            >
              <div 
                className="flex justify-between items-center"
              >
                <span 
                  style={{
                    width: "10px", 
                    height: "10px",
                    marginRight: "6px",
                    backgroundColor: item.color,
                  }}>
                </span>
                <span 
                  style={{ color: item.color, fontSize: numbers}}
                  className="font-bold text-base m-1"
                >
                  {item.title}
                </span>
              </div>
              <span 
                style={{
                  color: "#6C6A6A", 
                  fontSize: square,
                }}
                className="font-medium"
                >{item.size} m²</span>
            </div>
          ))}
        </div>
        ]}
      >
        <div className="font-sm title-row">
          <Row>
            <Col span={20}>
              <Typography style={{ fontSize: titleSize, fontWeight: "500" }}>
                Offices
              </Typography>
            </Col>
            <Col span={4}>
              <div className="dashboard-icon">
                <FolderOpenOutlined
                  style={{ fontSize: iconSize, color: "#0092FA" }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text style={{fontSize: subtitle, color: "#6C6A6A"}}>
              & Roles
              </Text>
            </Col>
          </Row>
        </div>
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
