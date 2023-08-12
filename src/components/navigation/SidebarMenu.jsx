import {
  DollarOutlined,
  FolderOpenOutlined,
  FileSearchOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  PieChartOutlined,
  HistoryOutlined,
  TransactionOutlined,
  FilePdfOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Menu, Space, Button } from "antd";
import "./menu.css";
import Logo from "../ui/logo/Logo";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Übersicht", "1", <DashboardOutlined />),
  getItem("Verwaltungsbereiche", "2", <FolderOpenOutlined />),
  getItem("Miet- und Pachtverträge", "3", <DollarOutlined />),
  getItem("Rechte und Belastungen", "4", <SettingOutlined />),
  getItem("Nutzung", "5", <PieChartOutlined />),
  getItem("Vorgänge", "6", <FileSearchOutlined />),
  getItem("Historie", "7", <HistoryOutlined />),
  getItem("Kassenzeichen", "8", <TransactionOutlined />),
  getItem("DMS", "9", <FilePdfOutlined />),
];
const SidebarMenu = ({ activeKey = ["1"] }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const storyWidth = 256;
  const isStory = false;
  const storyStyle = {
    width: isStory ? storyWidth : "100%",
    height: isStory ? "600px" : "100%",
  };

  return (
    <div
      className="flex flex-col bg-white max-w-min"
      style={{
        ...storyStyle,
      }}
    >
      <div
        style={{
          padding: "1rem",
          margin: "0.6rem 0",
        }}
      >
        <Space size={20}>
          <MenuOutlined />
          <Logo />
        </Space>
      </div>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        style={{
          maxWidth: "256",
        }}
        defaultSelectedKeys={activeKey}
        items={items}
        mode="inline"
        inlineCollapsed={collapsed}
      />
      <div className="logout mt-auto">
        <Space size={5}>
          <LogoutOutlined /> <span>Logout</span>
        </Space>
      </div>
    </div>
  );
};
export default SidebarMenu;
