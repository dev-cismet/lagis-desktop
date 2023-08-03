import { Row } from "antd";
import React from "react";
const FooterSection = () => {
  return (
    <div
      className="flex justify-beetween w-full"
      style={{ color: "#8F8F8F", lineHeight: 1 }}
    >
      <p>
        <span style={{ textDecoration: "#underline" }}>LagIS-online</span> ©
        2020. dev-hot-reload
      </p>
      <p className="ml-auto">Powered by cids</p>
    </div>
  );
};

export default FooterSection;
