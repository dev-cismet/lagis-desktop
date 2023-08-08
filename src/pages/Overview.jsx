import React from "react";
import Map from "../components/commons/Map";
import Offices from "../components/overview/Offices";
import Rent from "../components/overview/Rent";
import Rights from "../components/overview/Rights";
import Usage from "../components/overview/Usage";
import Operations from "../components/overview/Operations";
import History from "../components/overview/History";
import Transaction from "../components/overview/Transaction";
import DMS from "../components/overview/DMS";
import { Col, Row } from "antd";
const Overview = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
      backgroundColor: "#F1F1F1",
    };
  }
  const cardStyle = { width: "100%", height: (height - 3 * 16) / 4 };
  const mapHeight = height - 38 - 4 * 16;
  const gutterStyle = [16, 16];
  const marginBottomStyle = { marginBottom: "0px" };
  return (
    <div style={{ ...storyStyle, width, height, border: "1px solid red" }}>
      <Row gutter={gutterStyle}>
        <Col span={11}>
          <Row gutter={gutterStyle} style={marginBottomStyle}>
            <Col span={12}>
              <Offices
                style={marginBottomStyle}
                // width={cardStyle.width}
                // height={cardStyle.height}
              />
            </Col>
            <Col span={12}>
              <Rent
                style={marginBottomStyle}
                // width={cardStyle.width}
                // height={cardStyle.height}
              />
            </Col>
            <Col span={12}>
              <Rights
                style={marginBottomStyle}
                // width={cardStyle.width}
                // height={cardStyle.height}
              />
            </Col>
            <Col span={12}>
              <Usage
                style={marginBottomStyle}
                // width={cardStyle.width}
                // height={cardStyle.height}
              />
            </Col>
            <Col span={12}>
              <Operations
                style={marginBottomStyle}
                // width={cardStyle.width}
                // height={cardStyle.height}
              />
            </Col>
            <Col span={12}>
              <History
                style={marginBottomStyle}
                // width={cardStyle.width}
                // height={cardStyle.height}
              />
            </Col>
            <Col span={12}>
              <Transaction
                style={marginBottomStyle}
                // width={cardStyle.width}
                // height={cardStyle.height}
              />
            </Col>
            <Col span={12}>
              <DMS
                style={marginBottomStyle}
                // width={cardStyle.width}
                // height={cardStyle.height}
              />
            </Col>
          </Row>
        </Col>
        <Col span={13}>
          <Map width={width / 3 - 14} height={mapHeight - 2} />
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
