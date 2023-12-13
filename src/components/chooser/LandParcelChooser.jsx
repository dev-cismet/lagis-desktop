import React, { useState, useRef, useEffect } from "react";
import { BankOutlined, BlockOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import { useSearchParams } from "react-router-dom";
import {
  storeLagisLandparcel,
  storeAlkisLandparcel,
  getLandparcel,
  getAlkisLandparcel,
  storeMipa,
  storeRebe,
  storeHistory,
  switchToLandparcel,
} from "../../store/slices/lagis";
import { getSyncLandparcel } from "../../store/slices/ui";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { defaultLinksColor } from "../../core/tools/helper";

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
  const ifSyncLandparcel = useSelector(getSyncLandparcel);
  const [selectedGemarkung, setSelectedGemarkung] = useState();
  const [selectedFlur, setSelectedFlur] = useState();
  const [selectedFlurstueckLabel, setSelectedFlurstueckLabel] = useState();
  const gemarkungRef = useRef();
  const flurRef = useRef();
  const flurstueckRef = useRef();
  const [landparcelInternaDataStructure, setLandparcelInternaDataStructure] =
    useState();

  useEffect(() => {
    console.log("all", all);
    if (all && all.length > 1) {
      setLandparcelInternaDataStructure(buildData(all));
    }
  }, [all]);

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
            lfk: f.schluessel_id,
            art: f.flurstueckart || -1,
            alkis_id: f.alkis_id,
            hist: f.historisch,
          };
        } else {
          result[gemarkung].flure[flur] = {
            flur: flur,
            flurstuecke: {},
          };
          result[gemarkung].flure[flur].flurstuecke[flurstueck] = {
            label: flurstueck,
            lfk: f.schluessel_id,
            art: f.flurstueckart || -1,
            alkis_id: f.alkis_id,
            hist: f.historisch,
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
          lfk: f.schluessel_id,
          art: f.flurstueckart || -1,
          alkis_id: f.alkis_id,
          hist: f.historisch,
        };
      }
    }
    return result;
  };
  function padWithZeros(num, length) {
    return String(num).padStart(length, "0");
  }

  function replaceSlashWithDash(value) {
    return value ? value.replace("/", "-") : value;
  }
  const removeLagisStore = () => {
    dispatch(storeAlkisLandparcel(undefined));
    dispatch(storeLagisLandparcel(undefined));
    dispatch(storeRebe(undefined));
    dispatch(storeMipa(undefined));
    dispatch(storeHistory(undefined));
  };
  useEffect(() => {
    if (!landparcelInternaDataStructure) {
      return;
    }
    removeLagisStore();

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
      landparcelInternaDataStructure &&
      (fromUrl.gem !== fromState.gem ||
        fromUrl.flur !== fromState.flur ||
        fromUrl.fstck !== fromState.fstck)
    ) {
      gotoFstck(fromUrl);
    }
  }, [
    urlParams,
    selectedGemarkung,
    selectedFlur,
    selectedFlurstueckLabel,
    landparcelInternaDataStructure,
  ]);

  const handleGemarkungChange = (gemarkungValue) => {
    if (alkisLandparcel !== undefined && landparcel !== undefined) {
      // removeLagisStore();
    }
    const fullGemarkung = landparcelInternaDataStructure[gemarkungValue];
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
      // removeLagisStore();
    }
    setSelectedFlur(selectedGemarkung.flure[flurValue]);
    setSelectedFlurstueckLabel(undefined);
    // removeLagisStore();
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

  const gotoFstck = ({ gem, flur, fstck }) => {
    dispatch(switchToLandparcel({ gem, flur, fstck }));
  };

  const handleRefreshData = () => {
    if (selectedGemarkung && selectedFlur && selectedFlurstueckLabel) {
      removeLagisStore();
      flurstueckChoosen({
        gemarkung: selectedGemarkung.gemarkung,
        flur: selectedFlur.flur,
        ...selectedFlur.flurstuecke[selectedFlurstueckLabel],
      });
    }
  };
  if (!landparcelInternaDataStructure) {
    return null; //could be improved with 3 fake <Select> elements that are disabled and says "... laden"
  }
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
          (option?.label ?? "").toLowerCase().startsWith(input.toLowerCase())
        }
        optionFilterProp="children"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        onKeyDown={handleKeyGemarkung}
        onChange={handleGemarkungChange}
        options={Object.keys(landparcelInternaDataStructure).map((key) => {
          const el = landparcelInternaDataStructure[key];
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
          if (el.hist === false && el.art === "städtisch") {
            color = "black";
          } else if (el.hist === false && el.art === "Abteilung IX") {
            color = "purple";
          }
          return {
            label: (
              <span style={{ color }}>
                <span className="mr-1 text-sm">
                  {el.art === "städtisch" ? (
                    <BankOutlined />
                  ) : (
                    <BlockOutlined />
                  )}
                </span>
                {removeLeadingZeros(el.label)}
              </span>
            ),
            value: key,
          };
        })}
      />
      <Tooltip title="Flurstück neu laden">
        <SyncOutlined
          className="ml-6 cursor-pointer hover:text-slate-400"
          onClick={handleRefreshData}
          style={{
            color:
              !selectedGemarkung || !selectedFlur || !selectedFlurstueckLabel
                ? defaultLinksColor
                : null,
          }}
        />
      </Tooltip>
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
