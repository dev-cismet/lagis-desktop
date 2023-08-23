import React from "react";
import SidebarMenu from "../components/navigation/SidebarMenu";
import UserBar from "../components/header/UserBar";
import FooterSection from "../components/navigation/FooterSection";
import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div
      style={{
        background: "#F1F1F1",
      }}
      className="pr-4"
    >
      <div className="flex gap-4">
        <div>
          <SidebarMenu />
        </div>
        <div className="flex flex-col w-full">
          <div>
            <UserBar />
          </div>
          <div className="mt-3">
            <Outlet />
          </div>
          <div className="mt-auto">
            <FooterSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
