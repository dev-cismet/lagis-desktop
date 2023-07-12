import React from "react";
import Map from "../components/commons/Map";
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
  const gutterStyle = [12, 12];
  const marginBottomStyle = { marginBottom: "16px" };

  return (
    <div style={{ ...storyStyle, width, height }}>
      <Row gutter={gutterStyle}>
        <Col span={12}>
          <Row gutter={gutterStyle} style={marginBottomStyle}>
            <Col span={12}>
              <MockTileCard style={cardStyle} title="Tile 1" />
            </Col>
            <Col span={12}>
              <MockTileCard style={cardStyle} title="Tile 2" />
            </Col>
            <Col span={12}>
              <MockTileCard style={cardStyle} title="Tile 3" />
            </Col>
            <Col span={12}>
              <MockTileCard style={cardStyle} title="Tile 4" />
            </Col>
            <Col span={12}>
              <MockTileCard style={cardStyle} title="Tile 5" />
            </Col>
            <Col span={12}>
              <MockTileCard style={cardStyle} title="Tile 6" />
            </Col>
            <Col span={12}>
              <MockTileCard style={cardStyle} title="Tile 7" />
            </Col>
            <Col span={12}>
              <MockTileCard style={cardStyle} title="Tile 8" />
              {/* <DMS style={cardStyle} /> */}
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Map width={"100%"} height={height} />
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
