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
import { useLocation, NavLink } from "react-router-dom";

const items = [
  getItem(<NavLink to="/">Übersicht</NavLink>, "/", <DashboardOutlined />),
  getItem(
    <NavLink to="/verwaltungsbereiche">Verwaltungsbereiche</NavLink>,
    "/verwaltungsbereiche",
    <FolderOpenOutlined />
  ),
  getItem(
    <NavLink to="/miet">Miet- und Pachtverträge</NavLink>,
    "/miet",
    <DollarOutlined />
  ),
  getItem(
    <NavLink to="/rechte">Rechte und Belastungen</NavLink>,
    "/rechte",
    <SettingOutlined />
  ),
  getItem(
    <NavLink to="/nutzung">Nutzung</NavLink>,
    "/nutzung",
    <PieChartOutlined />
  ),
  getItem(
    <NavLink to="/vorgange">Vorgänge</NavLink>,
    "/vorgange",
    <FileSearchOutlined />
  ),
  getItem(
    <NavLink to="/historie">Historie</NavLink>,
    "/historie",
    <HistoryOutlined />
  ),
  getItem(
    <NavLink to="/kassenzeichen">Kassenzeichen</NavLink>,
    "/kassenzeichen",
    <TransactionOutlined />
  ),
  getItem(<NavLink to="/dms">DMS</NavLink>, "/dms", <FilePdfOutlined />),
];
const SidebarMenu = () => {
  const location = useLocation();
  const activeKey = location.pathname;
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
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
