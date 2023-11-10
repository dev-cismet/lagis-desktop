import React, { useState } from "react";
import { FileSearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { getJWT } from "../../store/slices/auth";
import queries from "../../core/queries/online";
import { fetchGraphQL } from "../../core/graphql";
import { useSelector, useDispatch } from "react-redux";

const SearchLandparcelByFileNumber = () => {
  const jwt = useSelector(getJWT);
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log("onSelect", value);
  };

  const getLandparcelByFileNumberHandle = async () => {
    const aktz = "%1.11%";
    const result = await fetchGraphQL(
      queries.getLandparcelByContractFileNumber,
      {
        aktz,
      },
      jwt
    );
    console.log("result xxx", result);
    if (result.status === 401) {
      return navigate("/login");
    }
  };

  const getLandparcelByMipaFileNumberHandle = async () => {
    const aktz = "%40%";
    const result = await fetchGraphQL(
      queries.getLandparcelByMipaFileNumber,
      {
        aktz,
      },
      jwt
    );
    console.log("result xxx", result);
    if (result.status === 401) {
      return navigate("/login");
    }
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
