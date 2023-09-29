import React from "react";
import { Card } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import "../overview/style.css";
import "./card.css";
import { defaultLinksColor } from "../../core/tools/helper";
const OverviewCard = ({
  style,
  title,
  subtitle,
  icon = <FieldTimeOutlined />,
  ifDefaultColor = true,
  fullHeiht,
  children,

  ...props
}) => {
  return (
    <Card
      style={{ width: "100%", height: "100%", minHeight: "180px" }}
      headStyle={{ padding: "0px 10px" }}
      bodyStyle={{ padding: "1px 10px", marginTop: "auto" }}
      className="custom-card shadow-md flex flex-col"
      title={
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col">
            <span
              className="text-lg leading-5"
              style={{ color: ifDefaultColor && defaultLinksColor }}
            >
              {title}
            </span>
            {subtitle && (
              <span
                className="text-sm"
                style={{
                  color: !ifDefaultColor ? "#6C6A6A" : defaultLinksColor,
                }}
              >
                {subtitle}
              </span>
            )}
          </div>
          <div className="text-2xl">{icon}</div>
        </div>
      }
      {...props}
    >
      {children}
    </Card>
  );
};

export default OverviewCard;
