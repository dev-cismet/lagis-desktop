import React from "react";
const FooterSection = () => {
  return (
    <div
      className="flex justify-beetween"
      style={{ color: "#8F8F8F", lineHeight: 1 }}
    >
      <div className="">
        <span style={{ textDecoration: "#underline" }}>LagIS-online</span> ©
        2023.
      </div>
      <div className="ml-auto">Powered by cids</div>
    </div>
  );
};

export default FooterSection;
