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
import MockTileCard from "../components/mock/MockTileCard";
const Overview = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
    };
  }
  const cardStyle = { width: "100%", height: (height - 3 * 12) / 4 };
  const gutterStyle = [24, 24];
  const marginBottomStyle = { marginBottom: "16px" };

  return (
    <div style={{ ...storyStyle, width, height }}>
      <Row gutter={gutterStyle}>
        <Col span={11}>
          <Row gutter={gutterStyle} style={marginBottomStyle}>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 1" /> */}
              <Offices />
            </Col>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 2" /> */}
              <Rent />
            </Col>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 3" /> */}
              <Rights />
            </Col>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 4" /> */}
              <Usage />
            </Col>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 5" /> */}
              <Operations />
            </Col>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 6" /> */}
              <History />
            </Col>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 7" /> */}
              <Transaction />
            </Col>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 8" /> */}
              <DMS style={cardStyle} />
            </Col>
          </Row>
        </Col>
        <Col span={13}>
          <Map width={"100%"} height={height} />
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
