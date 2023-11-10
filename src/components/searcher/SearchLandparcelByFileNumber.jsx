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

const SearchLandparcelByFileNumber = () => {
  const dispatch = useDispatch();
  const jwt = useSelector(getJWT);
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log("onSelect", value);
  };

  const getFlurstuckeByFileNumberHandle = async () => {
    const aktz = "%1.11%";
    const result = await fetchGraphQL(
      queries.getFlurstuckelByContractFileNumber,
      {
        aktz,
      },
      jwt
    );
    console.log("result xxx", result.data.flurstueck);
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
    <div className="p-2 w-[calc(100%-2px)]">
      <button onClick={getFlurstuckeByFileNumberHandle}>Set Contract</button>
      <button onClick={getFlurstuckelByMipaFileNumberHandle}>Set Mipa</button>
      <Input
        size="large"
        placeholder="large size"
        prefix={<FileSearchOutlined />}
      />
    </div>
  );
};

export default SearchLandparcelByFileNumber;
