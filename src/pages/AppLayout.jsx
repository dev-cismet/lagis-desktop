import React from "react";
import { Row, Col } from "antd";
import SidebarMenu from "../components/navigation/SidebarMenu";
import UserBar from "../components/header/UserBar";
import FooterSection from "../components/navigation/FooterSection";
import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#F1F1F1",
      }}
      className="pr-4"
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
        <Col span={19} style={{ display: "flex", flexDirection: "column" }}>
          <Row>
            <Col span={24}>
              <UserBar />
            </Col>
          </Row>
          <Row style={{ marginBottom: "32px" }}>
            <Col span={24}></Col>
          </Row>
          <Row style={{ marginBottom: "36px" }}>
            <Col span={24}>
              <Outlet />
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

export default AppLayout;
