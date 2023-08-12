import React from "react";
import { Row, Col } from "antd";
import SidebarMenu from "../components/navigation/SidebarMenu";
import UserBar from "../components/header/UserBar";
import Overview from "./Overview";
import FooterSection from "../components/navigation/FooterSection";
const MainLayout = ({ width = "100%", height = "100%", inStory = false }) => {
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
        background: "#F1F1F1",
      }}
      className="pr-4"
    >
      <div className="flex gap-4">
        <div>
          <SidebarMenu />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Row>
            <Col span={24} className="pb-1">
              <UserBar />
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Overview width={width} height={height} />
            </Col>
          </Row>
          <Row style={{ marginTop: "auto" }}>
            <Col span={24}>
              <FooterSection />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
