import React, { useRef, useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import "../overview/style.css"

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
          headStyle={{padding: "0px 10px"}}
          bodyStyle={{padding: "1px 10px", marginTop: "auto"}}
          style={{height: "100%"}}
          className="shadow-md flex flex-col"
          title={
            <div 
              className="flex flex-col itemes-start"
            >
            <span className="text-xl">
              {title}
            </span>
            {
              subtitle && 
              <span 
                className="text-sm"
                style={{color: "#6C6A6A"}}
              >
                {subtitle}
              </span>
            }
          </div>
          }
          extra={<div className="text-2xl">{icon}</div>}
          {...props}
        >
          {children}
        </Card>
    )
}

export default OverviewCard;