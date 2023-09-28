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
import { useSelector } from "react-redux";
import {
  getMipa,
  getOffices,
  getRebe,
  getUsage,
  getContract,
  getTransaction,
  getDms,
  getAdditionalRollen,
  getStreetFronts,
} from "../../store/slices/lagis";
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
  const mipa = useSelector(getMipa);
  const offices = useSelector(getOffices);
  const rebe = useSelector(getRebe);
  const usage = useSelector(getUsage);
  const contracts = useSelector(getContract);
  const transaction = useSelector(getTransaction);
  const dms = useSelector(getDms);
  const additionalRoll = useSelector(getAdditionalRollen);
  const streetFronts = useSelector(getStreetFronts);
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
      offices.length > 0 ||
        additionalRoll.length > 0 ||
        streetFronts.length > 0 ? (
        <NavLink
          to={`/verwaltungsbereiche?${buildUrlParams(parametersForLink)}`}
        >
          Verwaltungsbereiche
        </NavLink>
      ) : (
        "Verwaltungsbereiche"
      ),
      "/verwaltungsbereiche",
      <FolderOpenOutlined />
    ),
    getItem(
      mipa && mipa.length > 0 ? (
        <NavLink to={`/miet?${buildUrlParams(parametersForLink)}`}>
          Miet- und Pachtverträge
        </NavLink>
      ) : (
        "Miet- und Pachtverträge"
      ),
      "/miet",
      <DollarOutlined />
    ),
    getItem(
      rebe && rebe.length > 0 ? (
        <NavLink to={`/rechte?${buildUrlParams(parametersForLink)}`}>
          Rechte und Belastungen
        </NavLink>
      ) : (
        "Rechte und Belastungen"
      ),
      "/rechte",
      <SettingOutlined />
    ),
    getItem(
      usage && usage.length > 0 ? (
        <NavLink to={`/nutzung?${buildUrlParams(parametersForLink)}`}>
          Nutzung
        </NavLink>
      ) : (
        "Nutzung"
      ),
      "/nutzung",
      <PieChartOutlined />
    ),
    getItem(
      contracts && contracts.length > 0 ? (
        <NavLink to={`/vorgange?${buildUrlParams(parametersForLink)}`}>
          Vorgänge
        </NavLink>
      ) : (
        "Vorgänge"
      ),
      "/vorgange",
      <FileSearchOutlined />
    ),
    getItem(
      <NavLink to={`/historie?${buildUrlParams(parametersForLink)}`}>
        Historie
      </NavLink>,
      "/historie",
      <HistoryOutlined />
    ),
    getItem(
      transaction && transaction.length > 0 ? (
        <NavLink to={`/kassenzeichen?${buildUrlParams(parametersForLink)}`}>
          Kassenzeichen
        </NavLink>
      ) : (
        "Kassenzeichen"
      ),
      "/kassenzeichen",
      <TransactionOutlined />
    ),
    getItem(
      dms && dms.length > 0 ? (
        <NavLink to={`/dms?${buildUrlParams(parametersForLink)}`}>DMS</NavLink>
      ) : (
        "DMS"
      ),
      "/dms",
      <FilePdfOutlined />
    ),
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
        className="my-4 mb-5 flex flex-wrap items-start gap-2"
        style={{
          justifyContent: !collapsed ? "start" : "start",
          marginLeft: !collapsed ? "20px" : "26px",
        }}
      >
        <span onClick={toggleCollapsed} className="cursor-pointer">
          <MenuOutlined style={{ textAlign: "left" }} />
        </span>
        <Logo showText={collapsed} />
      </div>

      <div className="side-menu lg:ml-[-5px]">
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
