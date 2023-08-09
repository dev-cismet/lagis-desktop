import React from "react";
import { Row, Col } from "antd";
import SidebarMenu from "../../components/navigation/SidebarMenu";
import UserBar from "../../components/header/UserBar";
import FooterSection from "../../components/navigation/FooterSection";
import RentAndLease from "../RentAndLease";
const RentLayout = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px",
      borderColor: "#ddd",
    };
  }
  return (
    <div
      style={{
        ...storyStyle,
        width,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#F1F1F1",
        paddingRight: "16px",
      }}
    >
      <Row
        style={{
          height: "100%",
        }}
        gutter={[16, 16]}
      >
        <Col span={5}>
          <SidebarMenu activeKey={["3"]} />
        </Col>
        <Col span={19} style={{ display: "flex", flexDirection: "column" }}>
          <Row>
            <Col span={24}>
              <UserBar />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <RentAndLease height={height} />
            </Col>
          </Row>
          <Row style={{ marginTop: "auto" }}>
            <Col span={24}>
              <FooterSection />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default RentLayout;
