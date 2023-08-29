import { Select } from "antd";
import "./header-selector.css";
import queries from "../../../core/queries/online";
import { fetchGraphQL } from "../../../core/graphql";
import { getJWT, storeJWT, storeLogin } from "../../../store/slices/auth";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
const HeaderSelectors = () => {
  const dispatch = useDispatch();
  const jwt = useSelector(getJWT);
  const [gemarkunk, setGemarkunk] = useState("Haan");

  const getGemerkung = async () => {
    console.log("Start fetching");
    const result = await fetchGraphQL(
      queries.gemarkung,
      { _eq: gemarkunk },
      jwt
    );
    console.log("result", result);
    return result;
  };
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gemarkung", gemarkunk],
    queryFn: getGemerkung,
  });

  const names = [
    { value: "haan", label: "Haan" },
    { value: "Barmen", label: "barmen" },
    { value: "Beyenburg", label: "Beyenburg" },
  ];
  const numbersSmall = [
    { value: 20, label: "20" },
    { value: 10, label: "10" },
  ];
  const numbersBig = [
    { value: 120, label: "120" },
    { value: 210, label: "210" },
  ];
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setGemarkunk(value);
  };
  useEffect(() => {
    refetch();
    console.log("Refetch");
  }, [gemarkunk]);

  return (
    <div className="select-header flex gap-2">
      <Select
        defaultValue={gemarkunk}
        onChange={handleChange}
        options={names}
      />
      <Select
        defaultValue="10"
        onChange={handleChange}
        options={numbersSmall}
      />
      <Select defaultValue="10" onChange={handleChange} options={numbersBig} />
    </div>
  );
};
export default HeaderSelectors;
