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
    if (
      fromUrl.gem !== parametersForLink?.gem ||
      fromUrl.flur !== parametersForLink?.flur ||
      fromUrl.fstck !== parametersForLink?.fstck
    ) {
      setParametersForLink(fromUrl);
    }
  }, [urlParams, parametersForLink]);
  return (
    <div
      style={{
        background: "#F1F1F1",
      }}
    >
      <div className="flex items-start gap-4 pr-4 h-screen overflow-clip">
        <div className="h-full w-[10%]">
          <SidebarMenu parametersForLink={parametersForLink} />
        </div>
        <div className="w-[90%] h-full">
          <div className="h-[calc(4%-10px)] my-2">
            <UserBar />
          </div>

          <div className="h-[calc(95%-60px)] my-4 w-full">
            <Outlet />
          </div>

          <div className="h-[calc(1%)] mt-1">
            <FooterSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
