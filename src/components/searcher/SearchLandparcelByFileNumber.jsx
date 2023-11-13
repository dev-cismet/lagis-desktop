import React, { useState } from "react";
import { FileSearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { getJWT } from "../../store/slices/auth";
import queries from "../../core/queries/online";
import { fetchGraphQL } from "../../core/graphql";
import { useSelector, useDispatch } from "react-redux";
import {
  storeContractFlurstucke,
  storeMipaFlurstucke,
} from "../../store/slices/search";

const SearchLandparcelByFileNumber = ({ collapsed, setCollapsed }) => {
  const dispatch = useDispatch();
  const jwt = useSelector(getJWT);
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };

  const getFlurstuckeByFileNumberHandle = async (searchValue) => {
    const aktz = `%${searchValue}%`;
    const result = await fetchGraphQL(
      queries.getFlurstuckelByContractFileNumber,
      {
        aktz,
      },
      jwt
    );
    console.log("result xxx", result.data.flurstueck);
    console.log("contract data", result);
    if (result.status === 401) {
      return navigate("/login");
    }

    if (result?.data?.flurstueck) {
      dispatch(storeContractFlurstucke(result.data.flurstueck));
    }
  };

  const getFlurstuckelByMipaFileNumberHandle = async () => {
    const aktz = "%40%";
    const result = await fetchGraphQL(
      queries.getFlurstuckeByMipaFileNumber,
      {
        aktz,
      },
      jwt
    );
    console.log("result xxx", result);
    if (result.status === 401) {
      return navigate("/login");
    }
    if (result?.data?.view_mipa_by_aktenzeichen) {
      dispatch(storeMipaFlurstucke(result.data.view_mipa_by_aktenzeichen));
    }
  };
  return (
    <div
      className="p-1 cursor-pointer hover:bg-gray-100 text-center rounded-xl mt-1"
      style={{
        width: !collapsed ? "222px" : "100%",
        // margin: !collapsed ? "none" : "auto",
      }}
    >
      {/* <button onClick={getFlurstuckeByFileNumberHandle}>Set Contract</button> */}
      {/* <button onClick={getFlurstuckelByMipaFileNumberHandle}>Set Mipa</button> */}
      <FileSearchOutlined
        style={{ display: !collapsed ? "none" : null }}
        className="cursor-pointer text-base"
        onClick={() => setCollapsed(!collapsed)}
      />
      <Input
        size="large"
        placeholder="large size"
        prefix={<FileSearchOutlined />}
        onChange={(e) => getFlurstuckeByFileNumberHandle(e.target.value)}
        style={{ display: collapsed ? "none" : null }}
      />
    </div>
  );
};

export default SearchLandparcelByFileNumber;
