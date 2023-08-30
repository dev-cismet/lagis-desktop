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
  const [gemarkung, setGemarkung] = useState(11);
  const [bezeichnung, setBezeichnung] = useState([]);
  const [zaehler, setZaehler] = useState([]);
  const [activeZaehler, setActiveZaehler] = useState();
  const [nenner, setNenner] = useState([]);
  const [activeNenner, setActiveNenner] = useState([]);

  const getNenner = async () => {
    const result = await fetchGraphQL(
      queries.nenner,
      {
        gemarkung_id: gemarkung,
        zaehler: activeZaehler,
      },
      jwt
    );
    console.log("Gemarkung", gemarkung);
    console.log("Zaehler", activeZaehler);
    console.log("Nenner", result.data.flurstueck_schluessel);
    setActiveNenner(result.data.flurstueck_schluessel[0].flurstueck_nenner);
    setNenner(
      result.data.flurstueck_schluessel.map((n) => ({
        value: n.flurstueck_nenner,
        label: n.flurstueck_nenner,
      }))
    );
  };
  const getGemerkung = async () => {
    console.log("Start fetching");
    const result = await fetchGraphQL(queries.gemarkung, {}, jwt);
    setBezeichnung(
      result.data.gemarkung.map((g) => ({
        value: g.id,
        label: g.bezeichnung,
      }))
    );
    return result;
  };
  const getZaehlerGemerkung = async () => {
    const result = await fetchGraphQL(
      queries.zaehler,
      { gemarkung_id: gemarkung },
      jwt
    );
    console.log("Zahler", result);
    setActiveZaehler(
      (prev) => (prev = result.data.flurstueck_schluessel[0].flurstueck_zaehler)
    );

    setZaehler(
      result.data.flurstueck_schluessel.map((z) => ({
        value: z.flurstueck_zaehler,
        label: z.flurstueck_zaehler,
      }))
    );
  };
  // const { isLoading, error, data, refetch } = useQuery({
  //   queryKey: ["gemarkung", gemarkung],
  //   queryFn: getGemerkung,
  // });

  const handleChangeGemarkung = (value) => {
    console.log(`selected ${value}`);
    setGemarkung(value);
  };
  const handleChangeZaehler = (value) => {
    setActiveZaehler((prev) => value);
  };
  const handleChangeNenner = (value) => {
    setActiveNenner((prev) => value);
  };
  useEffect(() => {
    getGemerkung();
  }, []);
  useEffect(() => {
    getZaehlerGemerkung();
  }, [gemarkung]);
  useEffect(() => {
    getNenner();
  }, [activeZaehler]);

  return (
    <div className="select-header flex gap-2">
      <Select
        defaultValue={gemarkung}
        onChange={handleChangeGemarkung}
        options={bezeichnung}
      />
      <Select
        key={`zaehler${activeZaehler}`}
        defaultValue={activeZaehler}
        onChange={handleChangeZaehler}
        options={zaehler}
      />
      <Select
        defaultValue={activeNenner}
        key={`nenner${activeNenner}`}
        onChange={handleChangeNenner}
        options={nenner}
      />
    </div>
  );
};
export default HeaderSelectors;
