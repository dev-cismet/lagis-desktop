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
      className="w-full overflow-clip"
    >
      <div className="flex h-screen" style={{ paddingRight: "16px" }}>
        <div className="h-full">
          <SidebarMenu parametersForLink={parametersForLink} />
        </div>
        <div
          className="flex-1 w-[calc(100%-228px)] flex flex-col justify-between gap-2"
          style={{ paddingLeft: "16px" }}
        >
          <div className="h-[32px]" style={{ paddingTop: "8px" }}>
            <UserBar />
          </div>

          <div
            className="h-[calc(100%-50px)] w-full"
            style={{ paddingBottom: "8px" }}
          >
            <Outlet />
          </div>

          {/* <div className="h-[calc(1%-10px)]">
            <FooterSection />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
