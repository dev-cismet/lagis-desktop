import { Row } from "antd";
import React from "react";
const FooterSection = () => {
  return (
    <div
      className="flex justify-beetween"
      style={{ color: "#8F8F8F", lineHeight: 1 }}
    >
      <p className="mt-1">
        <span style={{ textDecoration: "#underline" }}>LagIS-online</span> ©
        2020. dev-hot-reload
      </p>
      <p className="mt-1 ml-auto">Powered by cids</p>
    </div>
  );
};

export default FooterSection;
