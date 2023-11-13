import React from "react";
import { Divider } from "antd";
import { useSearchParams } from "react-router-dom";
import { BankOutlined, BlockOutlined } from "@ant-design/icons";
import { defaultLinksColor } from "../../core/tools/helper";
const ShowNumberFilesSearchResult = ({ dataIn, extractor }) => {
  const data = extractor(dataIn);
  const [urlParams, setUrlParams] = useSearchParams();
  const dividerMargin = "8px 0";
  return (
    <>
      <h4 className="text-left text-sm pl-3 font-semibold mt-4 text-[#4E5663]">
        Ergebnisse
      </h4>
      <Divider style={{ margin: dividerMargin }} />

      <div
        style={{ maxHeight: "320px", background: "#ffffff" }}
        className="overflow-auto"
      >
        {data &&
          data.map((c) => {
            return (
              <div
                key={c.id}
                onClick={() => setUrlParams(c.searchParamsObj)}
                style={{
                  color: c.ifHistorical ? defaultLinksColor : null,
                  background: "#ffffff",
                }}
              >
                <div className="text-[14px] flex items-center pl-3 cursor-pointer">
                  {c.iconType === "bank" ? <BankOutlined /> : <BlockOutlined />}
                  <span className="ml-2 py-1">{c.content}</span>
                </div>
                <Divider style={{ margin: dividerMargin }} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ShowNumberFilesSearchResult;
