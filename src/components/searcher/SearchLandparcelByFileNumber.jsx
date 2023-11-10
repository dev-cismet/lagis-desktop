import React, { useState } from "react";
import { FileSearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const SearchLandparcelByFileNumber = () => {
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log("onSelect", value);
  };
  return (
    <div className="p-2 w-[calc(100%-2px)]">
      <Input
        size="large"
        placeholder="large size"
        prefix={<FileSearchOutlined />}
      />
    </div>
  );
};

export default SearchLandparcelByFileNumber;
