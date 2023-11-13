import React from "react";
import { useSearchParams } from "react-router-dom";
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
              className="text-sm"
            >
              {c.content}
            </div>
          );
        })}
    </div>
  );
};

export default ShowNumberFilesSearchResult;
