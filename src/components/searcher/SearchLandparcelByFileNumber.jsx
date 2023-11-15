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
  getContractFlurstucke,
  getMipaFlurstucke,
} from "../../store/slices/search";
import ShowNumberFilesSearchResult from "./ShowNumberFilesSearchResult";
import { searchContractExtractor } from "../../core/extractors/searchExtractor";
import { useNavigate } from "react-router-dom";

const SearchLandparcelByFileNumber = ({ collapsed, setCollapsed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = useSelector(getJWT);
  const contractFlurstucke = useSelector(getContractFlurstucke);
  const mipaFlurstucke = useSelector(getMipaFlurstucke);
  const [searchValue, setSearchValue] = useState("");

  const getFlurstuckeByContractAndMipa = async () => {
    if (searchValue === "") {
      dispatch(storeContractFlurstucke(undefined));
      dispatch(storeMipaFlurstucke(undefined));
      return false;
    }
    await getFlurstuckeByFileNumberHandle(searchValue);
    await getFlurstuckelByMipaFileNumberHandle(searchValue);
    setIfBeforeSearch(false);
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
    if (result.status === 401) {
      return navigate("/login");
    }

    if (result?.data?.flurstueck) {
      dispatch(storeContractFlurstucke(result.data.flurstueck));
    }
  };

  const getFlurstuckelByMipaFileNumberHandle = async (searchValue) => {
    const aktz = `%${searchValue}%`;
    const result = await fetchGraphQL(
      queries.getFlurstuckelByMipaFileNumber,
      {
        aktz,
      },
      jwt
    );
    if (result.status === 401) {
      return navigate("/login");
    }
    if (result?.data?.view_mipa_by_aktenzeichen) {
      dispatch(storeMipaFlurstucke(result.data.view_mipa_by_aktenzeichen));
    }
  };
  return (
    <div
      className="p-2 mt-auto flex flex-col gap-2"
      style={{
        width: !collapsed ? "222px" : "100%",
        maxHeight:
          !contractFlurstucke || !mipaFlurstucke || collapsed ? "10%" : "40%",
        // height: "400px",
        // border: "1px solid blue",
      }}
    >
      <FileSearchOutlined
        style={{ display: !collapsed ? "none" : null, fontSize: "16px" }}
        className="cursor-pointer text-base mx-auto"
        onClick={() => setCollapsed(!collapsed)}
      />
      <ShowNumberFilesSearchResult
        dataContract={contractFlurstucke}
        dataMipa={mipaFlurstucke}
        searchValue={searchValue}
        extractor={searchContractExtractor}
        collapsed={collapsed}
        cleaFunc={() => {
          dispatch(storeContractFlurstucke(undefined));
          dispatch(storeMipaFlurstucke(undefined));
        }}
      />
      <Input
        size="large"
        onPressEnter={getFlurstuckeByContractAndMipa}
        value={searchValue}
        prefix={<FileSearchOutlined />}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        style={{
          display: collapsed ? "none" : null,
          height: "40px",
          marginTop: "auto",
        }}
      />
    </div>
  );
};

export default SearchLandparcelByFileNumber;
