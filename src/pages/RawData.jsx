import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
const RawData = ({ data }) => {
  const productionMode = process.env.NODE_ENV === "development";
  const [text, setText] = useState("");
  useEffect(() => {
    if (data) {
      console.log("!!! rawData", data);
      setText(JSON.stringify(data.data, null, 2));
    }
  }, []);
  useEffect(() => {
    console.log("text", text);
  }, [text]);
  return (
    <div>
      <TextArea
        value={text}
        autoSize={{
          minRows: 2,
          maxRows: 20,
        }}
      />
      {/* {productionMode && (
        <TextArea
          value={text}
          autoSize={{
            minRows: 2,
            maxRows: 20,
          }}
        />
      )} */}
    </div>
  );
};

export default RawData;
