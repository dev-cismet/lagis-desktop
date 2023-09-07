import React, { useEffect } from "react";
import Map from "../components/commons/Map";
import Agencies from "../components/offices/Agencies";
import AdditionalRole from "../components/offices/AdditionalRole";
import Streetfronts from "../components/offices/Streetfronts";
import Notes from "../components/offices/Notes";
import { useSelector } from "react-redux";
import {
  getLandparcel,
  getStreetfronts,
  getAdditionalRoll,
} from "../store/slices/lagisLandparsel";
import { nanoid } from "@reduxjs/toolkit";

const Offices = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
      backgroundColor: "#F1F1F1",
    };
  }

  const landparcel = useSelector(getLandparcel);
  const streetfronts = useSelector(getStreetfronts);
  const additionalRoll = useSelector(getAdditionalRoll);
  const tableFormat = additionalRoll.map((r) => ({
    key: nanoid(),
    agency: `${additionalRoll[0].verwaltende_dienststelle.ressort.abkuerzung}.${additionalRoll[0].verwaltende_dienststelle.abkuerzung_abteilung}`,
    rolle: `${additionalRoll[0].zusatz_rolle_art.name}`,
  }));
  const mockcolor = "#12004320";
  const columns = [
    {
      title: "Dienststelle",
      dataIndex: "agency",
      render: (title, record, rowIndex) => (
        <div className="flex items-center">
          <span
            style={{
              width: "9px",
              height: "11px",
              marginRight: "6px",
              backgroundColor: mockcolor,
            }}
          ></span>
          <span>{title}</span>
        </div>
      ),
    },
    {
      title: "Rolle",
      dataIndex: "rolle",
    },
  ];
  const extractor = (input) => input;

  return (
    <div
      style={{ ...storyStyle, height }}
      className="offices-page flex flex-col gap-4"
    >
      <div className="flex gap-3 h-[60%]">
        <div className="w-2/5">
          <Agencies />
        </div>
        <div className="w-3/5">
          <Map width={"100%"} height={"100%"} />
        </div>
      </div>
      <div className="flex gap-3 h-[calc(40%-20px)]">
        <div className="flex-1">
          <AdditionalRole
            columns={columns}
            extractor={extractor}
            dataIn={tableFormat}
          />
        </div>
        <div className="flex-1">
          <Streetfronts
            extractor={extractor}
            dataIn={streetfronts ? streetfronts : []}
          />
        </div>
        <div className="flex-1">
          <Notes
            extractor={extractor}
            dataIn={landparcel ? landparcel[0].bemerkung : null}
          />
        </div>
      </div>
    </div>
  );
};

export default Offices;
