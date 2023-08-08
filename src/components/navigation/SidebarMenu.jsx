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
} from "@ant-design/icons";
import { Menu, Space } from "antd";
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
const SidebarMenu = () => {
  const storyWidth = 256;
  const isStory = false;
  const storyStyle = {
    width: isStory ? storyWidth : "100%",
    height: isStory ? "600px" : "100%",
  };
  return (
    <div
      style={{
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        ...storyStyle,
      }}
    >
      <div style={{ padding: "1.3rem", margin: "0.6rem 0" }}>
        <Space size={20}>
          <MenuOutlined />
          <Logo />
        </Space>
      </div>
      <Menu
        style={{
          width: "100%",
        }}
        defaultSelectedKeys={["1"]}
        items={items}
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
