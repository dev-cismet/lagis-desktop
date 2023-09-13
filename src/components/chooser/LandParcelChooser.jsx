import React, { useState, useRef, useEffect } from "react";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { getLandparcel } from "../../store/slices/lagisLandparcel";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";

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
    setUrlParams({ gem });
    if (flurParams !== null) {
      setUrlParams({ gem, flur: flurParams });
    }
    if (copyFstckParams) {
      setUrlParams({
        gem,
        flur: flurParams,
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
    if (fstckParams) {
      setUrlParams({
        gem: gemParams,
        flur: flurParams,
        fstck: fstckParams.replace(/[\/\/]/g, "-"),
      });
    } else {
      setUrlParams({ gem: gemParams, flur: flurValue });
    }
    setSelectedFlur(selectedGemarkung.flure[flurValue]);
    setTimeout(() => {
      flurstueckRef.current.focus();
    }, 10);
  };
  const handleFlurstueckChange = (flurstueckValue) => {
    console.log("lll handleFlurstueckChange", flurstueckValue);
    flurstueckChoosen({
      gemarkung: selectedGemarkung.gemarkung,
      flur: selectedFlur.flur,
      ...selectedFlur.flurstuecke[flurstueckValue],
    });
    setUrlParams({
      gem: gemParams,
      flur: flurParams,
      fstck: flurstueckValue.replace(/[\/\/]/g, "-"),
    });
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
  useEffect(() => {
    const gem = urlParams.get("gem");
    console.log("ggg flurParams", flurParams);
    if (gem) {
      const gemData = gemarkungen.filter((g) => g.bezeichnung === gem);
      setDefaultGemarkung((prev) => gem);
      const schluessel = gemData[0].schluessel.toString();
      handleGemarkungChange(schluessel);
    }
  }, []);
  useEffect(() => {
    console.log("lll flur use effevt", flurParams);
    if (selectedGemarkung !== undefined && flurParams) {
      handleFlurChange(flurParams);
    }
  }, [selectedGemarkung]);
  useEffect(() => {
    const fstc = urlParams.get("fstck");
    if (selectedFlur !== undefined && fstc) {
      console.log("lll get landparcel updated");
      handleFlurstueckChange(fstc);
    }
  }, [selectedFlur]);

  return (
    <>
      <Select
        defaultValue={defaultGemarkung}
        ref={gemarkungRef}
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
        defaultValue={flurParams}
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
        defaultValue={fstckParams}
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
        // defaultValue={
        //   defaultValue && {
        //     value: defaultValue.flurstueckValue,
        //     label: removeLeadingZeros(defaultValue.flurstueckValue),
        //   }
        // }
      />
    </>
  );
};

export default LandParcelChooser;

const removeLeadingZeros = (numberStr, flur = false) => {
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

// defaultValue && {
//   value: defaultValue.gemarkung,
//   label: defaultValue.gemarkungLabel,
// }
