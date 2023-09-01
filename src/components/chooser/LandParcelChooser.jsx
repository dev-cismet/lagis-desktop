import React, { useState } from "react";
// import './index.css';
import { Select } from "antd";
import { allExample, gemarkungenExample } from "./demo-data";
const LandParcelChooser = ({
  flurstueckChoosen = (fstck) => {
    console.log("!!!! flurstueck choosen", fstck);
  },
  all = allExample,
  gemarkungen = gemarkungenExample,
}) => {
  const [selectedGemarkung, setSelectedGemarkung] = useState();
  const [selectedFlur, setSelectedFlur] = useState();
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

  console.log(data);

  const handleGemarkungChange = (gemarkungValue) => {
    console.log("setSelectedGemarkung(data[value]);", data[gemarkungValue]);
    setSelectedGemarkung(data[gemarkungValue]);
    setSelectedFlur(undefined);
  };
  const handleFlurChange = (flurValue) => {
    console.log(`handleFlurChange`, flurValue);
    console.log("electedGemarkung.flure", selectedGemarkung.flure);
    console.log(
      `setSelectedFlur(selectedGemarkung[]);`,
      selectedGemarkung.flure[flurValue]
    );
    setSelectedFlur(selectedGemarkung.flure[flurValue]);
  };
  const handleFlurstueckChange = (flurstueckValue) => {
    flurstueckChoosen({
      gemarkung: selectedGemarkung.gemarkung,
      flur: selectedFlur.flur,
      ...selectedFlur.flurstuecke[flurstueckValue],
    });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      console.log("selected value", e.key);
    }
  };
  return (
    <>
      <Select
        showSearch
        placeholder="Gemarkung"
        style={{
          width: 200,
        }}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        optionFilterProp="children"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        onKeyDown={handleKeyDown}
        onChange={handleGemarkungChange}
        options={Object.keys(data).map((key) => {
          const el = data[key];
          return { label: el.gemarkung, value: key };
        })}
      />
      <Select
        placeholder="Flur"
        key={"Flure.for." + (selectedGemarkung?.gemarkung || "-")}
        showSearch
        style={{
          width: 200,
        }}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().startsWith(input)
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        onChange={handleFlurChange}
        options={Object.keys(selectedGemarkung?.flure || []).map((key) => {
          const el = selectedGemarkung?.flure[key];
          return { label: removeLeadingZeros(el.flur), value: key };
        })}
      />
      <Select
        key={
          "Flurstuecke.for." +
          (selectedGemarkung?.gemarkung || "-") +
          "." +
          selectedFlur?.flur
        }
        placeholder="Flurstück"
        showSearch
        style={{
          width: 200,
        }}
        filterOption={(input, option) =>
          (option?.value ?? "").toLowerCase().startsWith(input)
        }
        filterSort={(optionA, optionB) =>
          (optionA?.value ?? "")
            .toLowerCase()
            .localeCompare((optionB?.value ?? "").toLowerCase())
        }
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
              <span style={{ color }}>{removeLeadingZeros(el.label)}</span>
            ),
            value: key,
          };
        })}
      />
    </>
  );
};

export default LandParcelChooser;

const removeLeadingZeros = (numberStr) => {
  let startIndex = 0;

  while (startIndex < numberStr.length && numberStr[startIndex] === "0") {
    startIndex++;
  }

  const result = numberStr.substring(startIndex);

  return result;
};
