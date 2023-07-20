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
          bodyStyle={{padding: "0px 10px"}}
          className="shadow-md"
          title={
            <div className="flex flex-col itemes-start">
            <span className="text-xl">
              {title}
            </span>
            {
              subtitle && <span className="text-sm">{subtitle}</span>
            }
          </div>
          }
          extra={icon}
          {...props}
        >
          {children}
        </Card>
    )
}

export default OverviewCard;