import React from "react";
import { Card } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import "../overview/style.css";
import "./card.css";

const OverviewCard = ({
  style,
  title,
  subtitle,
  icon = <FieldTimeOutlined />,
  color,
  fullHeiht,
  children,
  ...props
}) => {
  return (
    <Card
      headStyle={{ padding: "0px 10px" }}
      bodyStyle={{ padding: "1px 10px", marginTop: "auto" }}
      style={{ height: "100%" }}
      className="custom-card shadow-md flex flex-col"
      title={
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col">
            <span className="text-xl" style={{ flexBasis: "auto;" }}>
              {title}
            </span>
            {subtitle && (
              <span className="text-sm" style={{ color: "#6C6A6A" }}>
                {subtitle}
              </span>
            )}
          </div>
          <div className="text-2xl">{icon}</div>
        </div>
      }
      // extra={<div className="text-2xl">{icon}</div>}
      {...props}
    >
      {children}
    </Card>
  );
};

export default OverviewCard;
