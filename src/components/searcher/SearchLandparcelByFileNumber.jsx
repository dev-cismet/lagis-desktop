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

const SearchLandparcelByFileNumber = ({ collapsed, setCollapsed }) => {
  const dispatch = useDispatch();
  const jwt = useSelector(getJWT);
  const contractFlurstucke = useSelector(getContractFlurstucke);
  const mipaFlurstucke = useSelector(getMipaFlurstucke);
  const [searchValue, setSearchValue] = useState("");

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const getFlurstuckeByContractAndMipa = async () => {};

  // const getFlurstuckeByFileNumberHandle = debounce(async (searchValue) => {
  //   console.log("debounce", searchValue);
  //   if (searchValue === "") {
  //     console.log("searchValue", searchValue === "");
  //     dispatch(storeContractFlurstucke(undefined));
  //     return false;
  //   }

  //   const aktz = `%${searchValue}%`;
  //   const result = await fetchGraphQL(
  //     queries.getFlurstuckelByContractFileNumber,
  //     {
  //       aktz,
  //     },
  //     jwt
  //   );
  //   if (result.status === 401) {
  //     return navigate("/login");
  //   }

  //   if (result?.data?.flurstueck) {
  //     dispatch(storeContractFlurstucke(result.data.flurstueck));
  //   }
  // }, 1000);

  const getFlurstuckeByFileNumberHandle = async (searchValue) => {
    console.log("debounce", searchValue);
    if (searchValue === "") {
      console.log("searchValue", searchValue === "");
      dispatch(storeContractFlurstucke(undefined));
      return false;
    }

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
      className="p-2 mt-auto flex flex-col"
      style={{
        width: !collapsed ? "222px" : "100%",
        maxHeight:
          contractFlurstucke?.length === 0 || !contractFlurstucke
            ? "10%"
            : "40%",
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
        cleaFunc={() => {
          dispatch(storeContractFlurstucke(undefined));
          dispatch(storeMipaFlurstucke(undefined));
          setSearchValue("");
        }}
      />
      <Input
        size="large"
        value={searchValue}
        prefix={<FileSearchOutlined />}
        // onChange={(e) => getFlurstuckeByFileNumberHandle(e.target.value)}
        onChange={(e) => {
          setSearchValue(e.target.value);
          getFlurstuckeByFileNumberHandle(e.target.value);
          getFlurstuckelByMipaFileNumberHandle(e.target.value);
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
