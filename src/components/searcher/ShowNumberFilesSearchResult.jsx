import React from "react";
import { useSearchParams } from "react-router-dom";
import { BankOutlined, BlockOutlined } from "@ant-design/icons";
import { defaultLinksColor } from "../../core/tools/helper";
const ShowNumberFilesSearchResult = ({ dataIn, extractor }) => {
  const data = extractor(dataIn);
  const [urlParams, setUrlParams] = useSearchParams();

  return (
    <div style={{ maxHeight: "420px" }} className="overflow-auto">
      {data &&
        data.map((c) => {
          return (
            <div
              key={c.id}
              onClick={() => setUrlParams(c.searchParamsObj)}
              className="text-sm flex items-center"
              style={{ color: c.ifHistorical ? defaultLinksColor : null }}
            >
              {c.iconType === "bank" ? <BankOutlined /> : <BlockOutlined />}
              <span className="ml-2 py-1">{c.content}</span>
            </div>
          );
        })}
    </div>
  );
};

export default ShowNumberFilesSearchResult;
