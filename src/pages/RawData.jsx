import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
const RawData = ({ data }) => {
  const productionMode = process.env.NODE_ENV === "development";
  return (
    <div>
      <TextArea
        value={JSON.stringify(data, null, 2)}
        autoSize={{
          minRows: 2,
          maxRows: 20,
        }}
      />
      {/* <div>{text}</div> */}
      {/* {productionMode && (
        <TextArea
          value={text}
          autoSize={{
            minRows: 2,
            maxRows: 20,
          }}
        /> */}
      {/* )} */}
    </div>
  );
};

export default RawData;
