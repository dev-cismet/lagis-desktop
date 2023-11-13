import React from "react";
import { Divider } from "antd";
import { useSearchParams } from "react-router-dom";
import { BankOutlined, BlockOutlined } from "@ant-design/icons";
import { defaultLinksColor } from "../../core/tools/helper";
const ShowNumberFilesSearchResult = ({ dataIn, extractor }) => {
  const data = extractor(dataIn);
  const [urlParams, setUrlParams] = useSearchParams();
  const dividerMargin = "4px 0";
  const lineStyle = {
    height: "1px",
    background: "#2A83FF",
    borderRadius: "20px",
    margin: dividerMargin,
  };
  console.log("show result data", data);
  return (
    <>
      <div style={{ display: data.length === 0 ? "none" : "block" }}>
        <h4 className="text-left text-sm pl-3 font-semibold mt-4 text-[#6c6a6a]">
          Ergebnisse
        </h4>
        <div style={lineStyle}></div>
        {/* <Divider
          style={{ margin: dividerMargin, backgroundColor: "#2A83FF" }}
        /> */}
      </div>
      <div
        style={{ height: "65%", background: "#ffffff" }}
        className="overflow-y-auto"
      >
        {data &&
          data.map((c) => {
            return (
              <div
                key={c.id}
                onClick={() => setUrlParams(c.searchParamsObj)}
                style={{
                  color: c.ifHistorical ? defaultLinksColor : null,
                  background: "#fffff",
                }}
              >
                <div className="h-[34px] text-[14px] flex items-center pl-3 cursor-pointer hover:bg-gray-100 text-center rounded">
                  {c.iconType === "bank" ? <BankOutlined /> : <BlockOutlined />}
                  <span className="ml-2 py-1">{c.content}</span>
                </div>
                <Divider
                  style={{ margin: dividerMargin }}
                  hover:bg-gray-100
                  text-center
                  rounded
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ShowNumberFilesSearchResult;
