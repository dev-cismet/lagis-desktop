import { Drawer, Tooltip, Avatar, Switch } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSyncLandparcel, setSyncLandparcel } from "../../store/slices/ui";
const UserName = ({ name = "User" }) => {
  const dispatch = useDispatch();
  const syncLandparcel = useSelector(getSyncLandparcel);
  const firstLetter = name.charAt(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="hidden md:block">
      <Tooltip title="Einstellungen" placement="bottom">
        <Avatar
          size="small"
          style={{
            background: "#4ABC96",
          }}
          className="cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        >
          <span className="uppercase" style={{ fontSize: "12px" }}>
            {firstLetter}
          </span>
        </Avatar>
      </Tooltip>
      <Drawer
        title="Einstellungen"
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size="large"
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h3>Allgemein</h3>
            <div
              className="flex items-center justify-between hover:bg-zinc-100 p-1 cursor-pointer"
              onClick={() => {
                dispatch(setSyncLandparcel(!syncLandparcel));
              }}
            >
              <span>
                Selektiertes Flurstück mit Java Anwendung synchronisieren
              </span>
              <Switch className="w-fit" checked={syncLandparcel} />
            </div>
          </div>
          <h3>Karte</h3>
        </div>
      </Drawer>
    </div>
  );
};

export default UserName;
