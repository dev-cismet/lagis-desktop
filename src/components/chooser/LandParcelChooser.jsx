import React, { useState, useRef, useEffect } from "react";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import { useSearchParams } from "react-router-dom";
import {
  storeLagisLandparcel,
  storeAlkisLandparcel,
  getLandparcel,
  getAlkisLandparcel,
  storeMipa,
  storeRebe,
} from "../../store/slices/lagis";
import { useDispatch, useSelector } from "react-redux";

function paramsToObject(entries) {
  const result = {};
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
}
const LandParcelChooser = ({
  flurstueckChoosen = (fstck) => {},
  all,
  gemarkungen,
}) => {
  const [urlParams, setUrlParams] = useSearchParams();
  const dispatch = useDispatch();
  const landparcel = useSelector(getLandparcel);
  const alkisLandparcel = useSelector(getAlkisLandparcel);
  const [selectedGemarkung, setSelectedGemarkung] = useState();
  const [selectedFlur, setSelectedFlur] = useState();
  const [selectedFlurstueckLabel, setSelectedFlurstueckLabel] = useState();
  const gemarkungRef = useRef();
  const flurRef = useRef();
  const flurstueckRef = useRef();
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
  function padWithZeros(num, length) {
    return String(num).padStart(length, "0");
  }
  const data = buildData(all);
  function replaceSlashWithDash(value) {
    return value ? value.replace("/", "-") : value;
  }
  useEffect(() => {
    const fromUrl = {
      gem: urlParams.get("gem") || undefined,
      flur: urlParams.get("flur") || undefined,
      fstck: urlParams.get("fstck") || undefined,
    };

    const fromState = {
      gem: selectedGemarkung?.gemarkung,
      flur: removeLeadingZeros(selectedFlur?.flur, true),
      fstck: replaceSlashWithDash(removeLeadingZeros(selectedFlurstueckLabel)),
    };

    if (
      fromUrl.gem !== fromState.gem ||
      fromUrl.flur !== fromState.flur ||
      fromUrl.fstck !== fromState.fstck
    ) {
      gotoFstck(fromUrl);
    }
  }, [urlParams, selectedGemarkung, selectedFlur, selectedFlurstueckLabel]);

  const handleGemarkungChange = (gemarkungValue) => {
    if (alkisLandparcel !== undefined && landparcel !== undefined) {
      dispatch(storeAlkisLandparcel(undefined));
      dispatch(storeLagisLandparcel(undefined));
      dispatch(storeRebe(undefined));
      dispatch(storeMipa(undefined));
    }
    const fullGemarkung = data[gemarkungValue];
    setSelectedGemarkung(fullGemarkung);
    setSelectedFlur(undefined);
    setSelectedFlurstueckLabel(undefined);

    const newParams = paramsToObject(urlParams);
    newParams.gem = fullGemarkung.gemarkung;
    delete newParams.flur;
    delete newParams.fstck;
    setUrlParams(newParams);

    setTimeout(() => {
      flurRef.current.focus();
    }, 10);
  };
  const handleFlurChange = (flurValue) => {
    if (alkisLandparcel !== undefined && landparcel !== undefined) {
      dispatch(storeAlkisLandparcel(undefined));
      dispatch(storeLagisLandparcel(undefined));
      dispatch(storeRebe(undefined));
      dispatch(storeMipa(undefined));
    }
    setSelectedFlur(selectedGemarkung.flure[flurValue]);
    setSelectedFlurstueckLabel(undefined);

    const newParams = paramsToObject(urlParams);
    newParams.flur = removeLeadingZeros(flurValue, true);
    delete newParams.fstck;
    setUrlParams(newParams);

    setTimeout(() => {
      flurstueckRef.current.focus();
    }, 10);
  };

  const handleFlurstueckChange = (flurstueckLabel) => {
    setSelectedFlurstueckLabel(flurstueckLabel);
    const newParams = paramsToObject(urlParams);
    newParams.fstck = replaceSlashWithDash(removeLeadingZeros(flurstueckLabel));
    setUrlParams(newParams);

    flurstueckChoosen({
      gemarkung: selectedGemarkung.gemarkung,
      flur: selectedFlur.flur,
      ...selectedFlur.flurstuecke[flurstueckLabel],
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

  const getGemarkungByName = (name) => {
    const result = Object.keys(data).find((key) => {
      return data[key].gemarkung === name;
    });
    if (result) {
      return data[result];
    }
  };

  const gotoFstck = ({ gem, flur, fstck }) => {
    if (gem && flur && fstck) {
      const fullGemarkung = getGemarkungByName(gem);
      setSelectedGemarkung(fullGemarkung);
      const fullFlur = fullGemarkung.flure[padWithZeros(flur, 3)];
      setSelectedFlur(fullFlur);

      //check whether fstck is conatining a dash
      const splitted = fstck.split("-");
      let fstckLabel;
      let pureLabel;
      if (splitted.length === 2 && splitted[1] !== "0") {
        fstckLabel =
          padWithZeros(splitted[0], 5) + "/" + padWithZeros(splitted[1], 4);
      } else {
        fstckLabel = padWithZeros(splitted[0], 5);
        // pureLabel = fstck;
      }
      const x = {
        gemarkung: fullGemarkung.gemarkung,
        flur: fullFlur.flur,
        ...fullFlur.flurstuecke[fstckLabel],
      };
      if (fullGemarkung && fullFlur && fullFlur.flurstuecke[fstckLabel]) {
        setSelectedFlurstueckLabel(fstckLabel);
        flurstueckChoosen(x);
      } else {
        setSelectedFlurstueckLabel();
      }
    } else if (gem && flur) {
      const fullGemarkung = getGemarkungByName(gem);
      setSelectedGemarkung(fullGemarkung);
      const fullFlur = fullGemarkung.flure[padWithZeros(flur, 3)];
      setSelectedFlur(fullFlur);
      setSelectedFlurstueckLabel();
      dispatch(storeAlkisLandparcel(undefined));
      dispatch(storeLagisLandparcel(undefined));
      dispatch(storeRebe(undefined));
      dispatch(storeMipa(undefined));
    } else if (gem || selectedGemarkung) {
      if (gem || selectedGemarkung) {
        const fullGemarkung = getGemarkungByName(gem);
        setSelectedGemarkung(fullGemarkung);
        setSelectedFlur();
        setSelectedFlurstueckLabel();
        dispatch(storeAlkisLandparcel(undefined));
        dispatch(storeLagisLandparcel(undefined));
        dispatch(storeRebe(undefined));
        dispatch(storeMipa(undefined));
      }
    }
  };

  return (
    <>
      {/* <Button
        onClick={() => {
          const gem = getGemarkungByName("Barmen");
          console.log("gem", gem);
          setSelectedGemarkung(gem);
          const flur = gem.flure[padWithZeros(1, 3)];
          setSelectedFlur(flur);

          const fstckLabel = "00007/0009";
          setSelectedFlurstueckLabel(fstckLabel);

          const x = {
            gemarkung: gem.gemarkung,
            flur: flur.flur,
            ...flur.flurstuecke[fstckLabel],
          };

          flurstueckChoosen(x);
        }}
      >
        Test
      </Button>
      <Button
        onClick={() => {
          console.log(' getGemarkungByName("sss");', getGemarkungByName("sss"));
        }}
      >
        Test2
      </Button> */}
      <Select
        ref={gemarkungRef}
        value={selectedGemarkung?.gemarkung || undefined}
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
        value={selectedFlur?.flur || undefined}
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
        value={selectedFlurstueckLabel || undefined}
        key={
          "Flurstuecke.for." +
          (selectedGemarkung?.gemarkung || "-") +
          "." +
          selectedFlur?.flur
        }
        placeholder="Flurstück"
        showSearch
        style={{
          width: 150,
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
