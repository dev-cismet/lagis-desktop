import React, { useEffect, useState } from "react";
import SidebarMenu from "../components/navigation/SidebarMenu";
import UserBar from "../components/header/UserBar";
import FooterSection from "../components/navigation/FooterSection";
import { Outlet } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const AppLayout = () => {
  const [urlParams, setUrlParams] = useSearchParams();
  const [parametersForLink, setParametersForLink] = useState();
  useEffect(() => {
    const fromUrl = {
      gem: urlParams.get("gem") || undefined,
      flur: urlParams.get("flur") || undefined,
      fstck: urlParams.get("fstck") || undefined,
    };
    setParametersForLink(fromUrl);
  }, [urlParams]);
  return (
    <div
      style={{
        background: "#F1F1F1",
      }}
      className="pr-4"
    >
      <div className="flex gap-4 h-screen">
        <div>
          <SidebarMenu parametersForLink={parametersForLink} />
        </div>
        <div className="flex flex-col w-full h-full">
          <UserBar />

          <Outlet />

          <div className="mt-auto pt-1">
            <FooterSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
