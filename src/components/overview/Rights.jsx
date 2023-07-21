import PropTypes from "prop-types";
import { SettingOutlined } from "@ant-design/icons";
import OverviewCard from "../ui/OverviewCard";
import "./style.css";
const mockExtractor = (input) => {
  return { numberOfRights: "3", color: "#EF5DA8" };
};
const DashboardRights = ({
  dataIn,
  extractor = mockExtractor,
  width = 231,
  height = 188,
  style,
  variant
}) => {

  const data = extractor(dataIn);
  console.log("Right", style)
  return (
    <div className="dashboard-tile">
      <OverviewCard
        title="Rechte & Belastungen"
        subtitle="& Dienstbarkeiten, Baulasten"
        icon={
        <SettingOutlined 
          className="text-3xl"
          style={{color: data.color}}
        />}
      >
      <div
        style={{
          color: data.color,
          fontSize: "5.5rem",
          textAlign: "left",
          width: "100%",
          lineHeight: "1.2"
        }}
      >
        <strong>{data.numberOfRights.toString().padStart(2, "0")}</strong>
      </div>
    </OverviewCard>
      {/* <Card
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
            <Col 
              span={20}
              >
              <Typography 
                style={{ 
                  fontSize: cardsSizes.titleSize,
                  fontWeight: "500",
                  lineHeight: "1.2",
                  }}
              >
                Right & Encumbarances
              </Typography>
            </Col>
            <Col span={4}>
              <div className="dashboard-icon">
                <SettingOutlined
                  style={{ fontSize: cardsSizes.iconSize, color: "#EF5DA8" }}
                  className="ml-auto mt-1"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col flex="1 0 100%">
              <Text
               style={{
                fontSize: cardsSizes.subtitle, 
                color: "#6C6A6A",
                display: "block",
                lineHeight: "1.2",
                }}
                >
                  Easements, Building encumbrances
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
            lineHeight: "1.3",
            fontWeight: "700",
          }}
        >
          <span>{data.numberOfDocuments.toString().padStart(2, "0")}</span>
        </div>
      </Card> */}
    </div>
  );
};
export default DashboardRights;

DashboardRights.propTypes = {
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
