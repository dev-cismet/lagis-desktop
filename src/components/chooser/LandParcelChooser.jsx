import React, { useState, useRef, useEffect } from "react";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { getLandparcel } from "../../store/slices/lagisLandparcel";
import { useSelector } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";
import { addLeadingZeros } from "../../core/tools/helper";
const LandParcelChooser = ({
  flurstueckChoosen = (fstck) => {
    console.log("!!!! flurstueck choosen", fstck);
  },
  all,
  gemarkungen,
  defaultValue,
  gemParams,
  flurParams,
  fstckParams,
}) => {
  const [selectedGemarkung, setSelectedGemarkung] = useState();
  const { search } = useLocation();
  // const searchParams = new URLSearchParams(search);
  const [urlParams, setUrlParams] = useSearchParams();
  const [defaultGemarkung, setDefaultGemarkung] = useState(gemParams);
  const [selectedFlur, setSelectedFlur] = useState();
  const gemarkungRef = useRef();
  const flurRef = useRef();
  const flurstueckRef = useRef();
  const landparcel = useSelector(getLandparcel);
  const copyFstckParams = fstckParams;
  const buildData = (xx) => {
    const gemarkungLookup = {};
    for (const g of gemarkungen) {
      gemarkungLookup[g.schluessel] = g.bezeichnung;
    }
    const result = {};
    for (const f of xx) {
      const splitted = f.alkis_id.split("-");
      const gemarkung = splitted[0].substring(2);
      const flur = splitted[1];
      const flurstueck = splitted[2];
      if (result[gemarkung]) {
        if (result[gemarkung].flure[flur]) {
          result[gemarkung].flure[flur].flurstuecke[flurstueck] = {
            label: flurstueck,
            lfk: f.fk_schluessel,
            art: f.flurstueck_schluessel?.fk_flurstueck_art || -1,
            alkis_id: f.alkis_id,
          };
        } else {
          result[gemarkung].flure[flur] = {
            flur: flur,
            flurstuecke: {},
          };
          result[gemarkung].flure[flur].flurstuecke[flurstueck] = {
            label: flurstueck,
            lfk: f.fk_schluessel,
            art: f.flurstueck_schluessel?.fk_flurstueck_art || -1,
            alkis_id: f.alkis_id,
          };
        }
      } else {
        result[gemarkung] = {
          gemarkung: gemarkungLookup[gemarkung] || gemarkung,
          flure: {},
        };
        result[gemarkung].flure[flur] = {
          flur: flur,
          flurstuecke: {},
        };
        result[gemarkung].flure[flur].flurstuecke[flurstueck] = {
          label: flurstueck,
          lfk: f.fk_schluessel,
          art: f.flurstueck_schluessel?.fk_flurstueck_art || -1,
          alkis_id: f.alkis_id,
        };
      }
    }
    return result;
  };
  const data = buildData(all);
  const handleGemarkungChange = (gemarkungValue) => {
    const gem = data[gemarkungValue]?.gemarkung || undefined;
    if (gem) {
      setUrlParams({ gem });
    }
    if (flurParams) {
      setUrlParams({ gem, flur: removeLeadingZeros(flurParams, true) });
    }
    if (copyFstckParams) {
      setUrlParams({
        gem,
        flur: removeLeadingZeros(flurParams, true),
        fstck: copyFstckParams.replace(/[\/\/]/g, "-"),
      });
    }
    setSelectedGemarkung(data[gemarkungValue]);
    setSelectedFlur(undefined);
    setTimeout(() => {
      flurRef.current.focus();
    }, 10);
  };
  const handleFlurChange = (flurValue) => {
    if (gemParams) {
      setUrlParams({ gem: gemParams });
    }
    if (flurParams) {
      setUrlParams({
        gem: gemParams,
        flur: removeLeadingZeros(flurValue, true),
      });
    }
    if (copyFstckParams) {
      setUrlParams({
        gem: gemParams,
        flur: removeLeadingZeros(flurValue, true),
        fstck: copyFstckParams.replace(/[\/\/]/g, "-"),
      });
    }
    if (selectedGemarkung?.flure[flurValue]) {
      setSelectedFlur(selectedGemarkung.flure[flurValue]);
      setTimeout(() => {
        flurstueckRef.current.focus();
      }, 10);
    }
  };
  const handleFlurstueckChange = (flurstueckValue) => {
    flurstueckChoosen({
      gemarkung: selectedGemarkung.gemarkung,
      flur: selectedFlur.flur,
      ...selectedFlur.flurstuecke[flurstueckValue],
    });

    // const flurstuecParams = removeLeadingZeros(flurstueckValue);
    // if (flurstuecParams) {
    //   setUrlParams({
    //     gem: gemParams,
    //     flur: removeLeadingZeros(flurParams, true),
    //     fstck: removeLeadingZeros(flurstueckValue).replace(/[\/\/]/g, "-"),
    //   });
    // }
  };
  const handleKeyGemarkung = (e) => {
    if (e.key === "Enter") {
      flurRef.current.focus();
    }
  };
  const handleKeyFlur = (e) => {
    if (e.key === "Enter") {
      flurstueckRef.current.focus();
    }
  };
  // useEffect(() => {
  //   for (const [key, value] of searchParams.entries()) {
  //     console.log("hash", `${key}, ${value}`);
  //   }
  // }, [search]);
  useEffect(() => {
    console.log("llll 1", gemParams, flurParams, fstckParams);
    if (gemParams !== null) {
      const gemData = gemarkungen.filter((g) => g.bezeichnung === gemParams);
      const schluessel = gemData[0]?.schluessel.toString() || undefined;
      handleGemarkungChange(schluessel);
    }
  }, []);
  useEffect(() => {
    console.log(
      "llll 2 selectedGemarkung",
      gemParams,
      flurParams,
      fstckParams,
      selectedGemarkung,
      selectedFlur
    );
    if (selectedGemarkung !== undefined && flurParams) {
      console.log("llll 2 flur handle", flurParams);
      handleFlurChange(flurParams);
    }
  }, [selectedGemarkung]);
  useEffect(() => {
    console.log(
      "llll 3 flurParams effect",
      gemParams,
      flurParams,
      fstckParams,
      selectedGemarkung,
      selectedFlur
    );
    const flurstuecke = selectedFlur?.flurstuecke || {};
    const flurstueckeArr = Object.keys(flurstuecke);
    const flurstueck = flurstueckeArr.filter(
      (item) => removeLeadingZeros(item) === fstckParams
    );
    console.log("llll 3 flurstuecke", flurstueck);
    if (selectedFlur !== undefined && fstckParams) {
      console.log("llll 3 flurParams handleFlurstueckChange", flurstueck[0]);
      handleFlurstueckChange(flurstueck[0]);
    }
    if (fstckParams) {
    }
  }, [selectedFlur, fstckParams]);

  useEffect(() => {
    console.log(
      "llll 4 flurParams effect",
      gemParams,
      flurParams,
      fstckParams,
      selectedGemarkung,
      selectedFlur
    );
    // if (!flurParams) {
    //   setSelectedFlur(undefined);
    // }
    if (flurParams !== undefined && selectedFlur === undefined) {
      console.log("llll 4 flurParams effect");
      handleFlurChange(flurParams);
    }
  }, [flurParams]);

  useEffect(() => {
    console.log(
      "llll 5 flurParams effect",
      gemParams,
      flurParams,
      fstckParams,
      selectedGemarkung,
      selectedFlur
    );
    if (!gemParams) {
      setSelectedGemarkung(undefined);
      gemarkungRef.current.focus();
    }

    if (gemParams && selectedGemarkung === undefined) {
      const gemData = gemarkungen.filter((g) => g.bezeichnung === gemParams);
      const schluessel = gemData[0].schluessel.toString();
      handleGemarkungChange(schluessel);
    }
  }, [gemParams]);

  return (
    <>
      <Select
        // defaultValue={defaultGemarkung}
        ref={gemarkungRef}
        value={gemParams}
        showSearch
        placeholder="Gemarkung"
        style={{
          width: 160,
        }}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().startsWith(input)
        }
        optionFilterProp="children"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        onKeyDown={handleKeyGemarkung}
        onChange={handleGemarkungChange}
        options={Object.keys(data).map((key) => {
          const el = data[key];
          return { label: el.gemarkung, value: key };
        })}
      />
      <Select
        ref={flurRef}
        // defaultValue={{
        //   label: removeLeadingZeros(flurParams),
        //   value: flurParams,
        // }}
        value={{
          label: removeLeadingZeros(flurParams, true),
          value: flurParams,
        }}
        placeholder="Flur"
        key={"Flure.for." + (selectedGemarkung?.gemarkung || "-")}
        showSearch
        style={{
          width: 100,
        }}
        onKeyDown={handleKeyFlur}
        className="mx-1"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().startsWith(input)
        }
        filterSort={(optionA, optionB) =>
          parseInt(optionA.label, 10) - parseInt(optionB.label, 10)
        }
        onChange={handleFlurChange}
        options={Object.keys(selectedGemarkung?.flure || []).map((key) => {
          const el = selectedGemarkung?.flure[key];
          return { label: removeLeadingZeros(el.flur, true), value: key };
        })}
      />
      <Select
        ref={flurstueckRef}
        // defaultValue={{
        //   label: fstckParams,
        //   value: fstckParams,
        // }}
        value={fstckParams}
        key={
          "Flurstuecke.for." +
          (selectedGemarkung?.gemarkung || "-") +
          "." +
          selectedFlur?.flur
        }
        placeholder="Flurstück"
        showSearch
        style={{
          width: 100,
        }}
        filterOption={(input, option) => {
          const inputValue = input.toLowerCase();
          const optionValue = (
            removeLeadingZeros(option.value) || ""
          ).toLowerCase();
          return optionValue.startsWith(inputValue);
        }}
        filterSort={(optionA, optionB) => {
          return parseFloat(optionA.value) - parseFloat(optionB.value);
        }}
        onChange={handleFlurstueckChange}
        options={Object.keys(selectedFlur?.flurstuecke || []).map((key) => {
          const el = selectedFlur?.flurstuecke[key];
          let color = "lightgrey";
          if (el.art === 1) {
            color = "black";
          } else if (el.art === 2) {
            color = "purple";
          }
          return {
            label: (
              <span style={{ color }}>
                <span className="mr-1 text-sm">
                  {color === "black" || color === "purple" ? (
                    <UnlockOutlined />
                  ) : (
                    <LockOutlined />
                  )}
                </span>
                {removeLeadingZeros(el.label)}
              </span>
            ),
            value: key,
          };
        })}
      />
    </>
  );
};

export default LandParcelChooser;

const removeLeadingZeros = (numberStr, flur = false) => {
  if (!numberStr) {
    return undefined;
  }
  const parts = numberStr.split("/");

  const trimmedParts = parts.map((part) => {
    let startIndex = 0;

    while (startIndex < part.length && part[startIndex] === "0") {
      startIndex++;
    }

    return part.substring(startIndex);
  });

  const flurResalt = trimmedParts.join("/");

  const result =
    trimmedParts.length > 1
      ? trimmedParts.join("/")
      : trimmedParts.join("") + "/0";

  return !flur ? result : flurResalt;
};
