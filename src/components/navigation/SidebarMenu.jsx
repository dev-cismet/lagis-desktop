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
import { Menu } from "antd";
import "./menu.css";
import Logo from "../ui/logo/Logo";
import { useEffect } from "react";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
import { Link } from "react-router-dom";
const items = [
  getItem(<Link to="/">Übersicht</Link>, "1", <DashboardOutlined />),
  getItem(
    <Link to="/verwaltungsbereiche">Verwaltungsbereiche</Link>,
    2,
    <FolderOpenOutlined />
  ),
  getItem(
    <Link to="miet">Miet- und Pachtverträge</Link>,
    "3",
    <DollarOutlined />
  ),
  getItem(
    <Link to="rechte"> Rechte und Belastungen</Link>,
    "4",
    <SettingOutlined />
  ),
  getItem(<Link to="/nutzung">Nutzung</Link>, "5", <PieChartOutlined />),
  getItem(<Link to="/vorgänge">Vorgänge</Link>, "6", <FileSearchOutlined />),
  getItem(<Link to="/historie">Historie</Link>, "7", <HistoryOutlined />),
  getItem(
    <Link to="kassenzeichen">Kassenzeichen</Link>,
    "8",
    <TransactionOutlined />
  ),
  getItem(<Link to="/dms">DMS</Link>, "9", <FilePdfOutlined />),
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
  useEffect(() => {
    window.innerWidth <= 768 && setCollapsed(true);
  }, []);
  return (
    <div
      className="bg-white border-solid border-white"
      style={{
        ...storyStyle,
      }}
    >
      <div
        className="my-4 mb-5 flex flex-wrap items-center gap-2"
        style={{
          justifyContent: !collapsed ? "start" : "center",
          marginLeft: !collapsed ? "20px" : "0px",
        }}
      >
        <span onClick={toggleCollapsed} className="cursor-pointer">
          <MenuOutlined />
        </span>
        <Logo showText={collapsed} />
      </div>

      <div className="side-menu">
        <Menu
          style={{
            border: 0,
            marginLeft: "-5px",
          }}
          defaultSelectedKeys={activeKey}
          items={items}
          mode="inline"
          inlineCollapsed={collapsed}
        />
      </div>
    </div>
  );
};
export default SidebarMenu;
