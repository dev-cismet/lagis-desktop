import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
const Labelform = ({ name }) => {
  return (
    <span style={{ fontSize: "12px" }}>
      {name}{" "}
      <InfoCircleOutlined
        style={{ fontSize: "12px", color: "#858585", marginLeft: "1px" }}
      />
    </span>
  );
};

export default Labelform;
