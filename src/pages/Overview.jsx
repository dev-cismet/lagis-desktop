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
import cardsSizes from "../components/ui/cards-sizes";
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
  const gutterStyle = [16, 16];
  const marginBottomStyle = { marginBottom: "0px" };

  console.log("Page Overview", width)

  if(width >= 508 && width < 764){
    cardsSizes.numberBottom = "-6px";
    cardsSizes.numberSize = "60px";
    console.log("Page Overview", "one")
  }else if (width >= 764 && width < 1020){
    cardsSizes.numberSize = "70px";
    cardsSizes.numberBottom = "-2px";
    console.log("Page Overview", "two")
  }
  else if(width >= 1020 && width < 1106){
    cardsSizes.numberSize = "64px";
    cardsSizes.cardPadding = "12px";
    cardsSizes.subtitle = "12px";
    cardsSizes.titleSize = "16px";
    cardsSizes.cardPadding = "12px";
    console.log("Page Overview", "three")
  }
  else if(width >= 1106 && width < 1660) {
    cardsSizes.numberSize = "76px";
    cardsSizes.numberBottom = "-11px";
    cardsSizes.cardPadding = "18px";
    cardsSizes.titleSize = "18px";
    cardsSizes.subtitle = "13px";
    cardsSizes.iconSize = "25px";
    console.log("Page Overview", "five")
  }
  else if (width >= 1660 && width < 2300){
    cardsSizes.numberSize = '100px';
    cardsSizes.cardPadding = "28px";
    cardsSizes.numberBottom = "-1px";
    console.log("Page Overview", "Six")
  }
  else if (width < 2300){
    cardsSizes.numberSize = "120px";
    console.log("Page Overview", "last if")
  }
  else {
    console.log("Page Overview", "Nothing was found")
  }

  return (
    <div style={{ ...storyStyle, width, height }}>
      <Row gutter={gutterStyle}>
        <Col span={11}>
          <Row gutter={gutterStyle} style={marginBottomStyle}>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 1" /> */}
              <Offices 
                style={marginBottomStyle}
                width={cardStyle.width}
                height={cardStyle.height}
              />
            </Col>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 2" /> */}
              <Rent
                style={marginBottomStyle}
                width={cardStyle.width}
                height={cardStyle.height}
              />
            </Col>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 3" /> */}
              <Rights 
                style={marginBottomStyle}
                width={cardStyle.width}
                height={cardStyle.height}
              />
            </Col>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 4" /> */}
              <Usage  
                style={marginBottomStyle}
                width={cardStyle.width}
                height={cardStyle.height}
              />
            </Col>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 5" /> */}
              <Operations
                style={marginBottomStyle}
                width={cardStyle.width}
                height={cardStyle.height}
              />
            </Col>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 6" /> */}
              <History
                style={marginBottomStyle}
                width={cardStyle.width}
                height={cardStyle.height}
              />
            </Col>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 7" /> */}
              <Transaction
                style={marginBottomStyle}
                width={cardStyle.width}
                height={cardStyle.height}
              />
            </Col>
            <Col span={12}>
              {/* <MockTileCard style={cardStyle} title="Tile 8" /> */}
              <DMS
                style={marginBottomStyle}
                width={cardStyle.width}
                height={cardStyle.height}
              />
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
