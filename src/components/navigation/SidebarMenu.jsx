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
      <div className="mt-6 mb-10 mx-4 flex flex-wrap items-center justify-center gap-2">
        <Logo />
        <Button
          onClick={toggleCollapsed}
          style={{
            margin: "auto 0",
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>

      <Menu
        style={{
          minWidth: "120px",
          border: 0,
        }}
        defaultSelectedKeys={activeKey}
        items={items}
        mode="inline"
        inlineCollapsed={collapsed}
      />
      <div className="mt-auto px-4 pb-2">
        <Button
          onClick={toggleCollapsed}
          style={{
            margin: "auto 0",
            width: "100%",
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
    </div>
  );
};
export default SidebarMenu;
