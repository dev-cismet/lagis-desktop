import React from "react";
import { Row, Col } from "antd";
import MockSpace from "../components/mock/MockSpace";
import SidebarMenu from "../components/navigation/SidebarMenu";
import UserBar from "../components/header/UserBar";
import BreadcrumbBlock from "../components/ui/breadcrumb/BreadcrumbBlock";
import Overview from "./Overview";

const menuWidth = 260;
const footerHeight = 42;
const toolbarHeight = 70;
const gutter = 12;

const MainLayout = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px",
      borderColor: "#ddd",
      // padding: "10px",
    };
  }

  // const adjustedMenuWidth = menuWidth - gutter;
  // const adjustedToolbarHeight = toolbarHeight - gutter;
  // const adjustedFooterHeight = footerHeight - gutter;

  return (
    <div
      style={{
        ...storyStyle,
        width,
        height,
        display: "flex",
        flexDirection: "column",
        background: "#F1F1F1",
        // padding: gutter,
      }}
    >
      <Row
        style={{
          height: "100%",
          // marginBottom: `${gutter}px`,
        }}
        gutter={20}
      >
        <Col span={5}>
          <SidebarMenu />
        </Col>
        <Col span={19}>
          <Row gutter={16}>
            <Col span={24}>
              <UserBar />
            </Col>
          </Row>
          <Row>
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

{
  /* <Row
style={{ flexGrow: 1, display: "flex", marginBottom: `${gutter}px` }}
>
<Col
  style={{
    width: `${adjustedMenuWidth}px`,
    height: "100%",
    marginRight: `${gutter}px`,
  }}
>
  <MockSpace title="Menu" />
</Col>
<Col style={{ flexGrow: 1 }}>
  <MockSpace title="Page Content" />
</Col>
</Row>
<Row style={{ height: `${adjustedFooterHeight}px` }}>
<Col span={24}>
  <MockSpace title="Status Bar" />
</Col>
</Row> */
}
