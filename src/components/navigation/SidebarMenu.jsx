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
import { buildUrlParams } from "../../core/tools/helper";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
import { useLocation, NavLink } from "react-router-dom";

const SidebarMenu = ({ parametersForLink }) => {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("/");
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
  const items = [
    getItem(
      <NavLink to={`/?${buildUrlParams(parametersForLink)}`}>
        Übersicht
      </NavLink>,
      "/",
      <DashboardOutlined />
    ),
    getItem(
      <NavLink to={`/verwaltungsbereiche?${buildUrlParams(parametersForLink)}`}>
        Verwaltungsbereiche
      </NavLink>,
      "/verwaltungsbereiche",
      <FolderOpenOutlined />
    ),
    getItem(
      <NavLink to={`/miet?${buildUrlParams(parametersForLink)}`}>
        Miet- und Pachtverträge
      </NavLink>,
      "/miet",
      <DollarOutlined />
    ),
    getItem(
      <NavLink to={`/rechte?${buildUrlParams(parametersForLink)}`}>
        Rechte und Belastungen
      </NavLink>,
      "/rechte",
      <SettingOutlined />
    ),
    getItem(
      <NavLink to={`/nutzung?${buildUrlParams(parametersForLink)}`}>
        Nutzung
      </NavLink>,
      "/nutzung",
      <PieChartOutlined />
    ),
    getItem(
      <NavLink to={`/vorgange?${buildUrlParams(parametersForLink)}`}>
        Vorgänge
      </NavLink>,
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
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
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
  useEffect(() => {
    setActiveKey(location.pathname);
  }, [location.pathname]);

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

      <div className="side-menu w-20 lg:ml-[-5px] lg:w-60">
        <Menu
          style={{ border: 0 }}
          defaultSelectedKeys={activeKey}
          selectedKeys={[activeKey]}
          items={items}
          mode="inline"
          inlineCollapsed={collapsed}
        />
      </div>
    </div>
  );
};
export default SidebarMenu;
