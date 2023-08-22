import {
  DollarOutlined,
  FolderOpenOutlined,
  FileSearchOutlined,
  DashboardOutlined,
  SettingOutlined,
  PieChartOutlined,
  HistoryOutlined,
  TransactionOutlined,
  FilePdfOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Menu, Button } from "antd";
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
        className="mt-6 mb-10 flex flex-wrap items-center gap-2"
        style={{
          justifyContent: !collapsed ? "start" : "center",
        }}
      >
        <Button onClick={toggleCollapsed} type="text">
          <MenuOutlined />
        </Button>
        <Logo showText={collapsed} />
      </div>

      <Menu
        style={{
          // minWidth: "10px",
          border: 0,
        }}
        defaultSelectedKeys={activeKey}
        items={items}
        mode="vertical"
        inlineCollapsed={collapsed}
      />
    </div>
  );
};
export default SidebarMenu;
