import React from "react";
import { Row, Col } from "antd";
import SidebarMenu from "../components/navigation/SidebarMenu";
import UserBar from "../components/header/UserBar";
import BreadcrumbBlock from "../components/ui/breadcrumb/BreadcrumbBlock";
import Overview from "./Overview";
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
        height,
        display: "flex",
        flexDirection: "column",
        background: "#F1F1F1",
      }}
    >
      <Row
        style={{
          height: "100%",
        }}
        gutter={[16, 16]}
      >
        <Col span={5}>
          <SidebarMenu />
        </Col>
        <Col span={19}>
          <Row>
            <Col span={24}>
              <UserBar />
            </Col>
          </Row>
          <Row style={{ marginBottom: "12px" }}>
            <Col span={24}>
              <BreadcrumbBlock />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Overview />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MainLayout;
