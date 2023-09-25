import React from "react";
import Contracts from "../components/operations/Contracts";
import ContractData from "../components/operations/ContractData";
import CrossReferences from "../components/operations/CrossReferences";
import { useSelector } from "react-redux";
import { getLandparcel } from "../store/slices/lagis";
import { useState } from "react";
import {
  contractsBlockExtractor,
  contractDataBlockExtractor,
  crossReferencesExtractor,
  querverweiseContractExtractor,
} from "../core/extractors/operationPageExtractors";
import { getJWT } from "../store/slices/auth";
const mockExtractor = (input) => {
  return [
    {
      key: 1,
      vertragsart: "Vermietung",
      nummer: "Nummer 1",
      quadratmeterpreis: "1000",
      kaufpreis: "kaufpreis 1",
      note: "Text of note 1",
      kosten: [
        {
          key: 1,
          kostenart: "Vermietung",
          betrag: "01.05.2023",
          anweisung: "01.06.2023",
        },
        {
          key: 2,
          kostenart: "Leasing",
          betrag: "01.02.2023",
          anweisung: "01.06.2023",
        },
      ],
      resolution: [
        {
          key: 1,
          beschlussart: "Vermietung",
          datum: "01.05.2023",
        },
        {
          key: 2,
          beschlussart: "Leasing",
          datum: "01.05.2023",
        },
      ],
      voreigentümer: "Voreigentümer 1",
      auflassung: "Auflassung 1",
      eintragung: "Eintragung 1",
      bemerkung: "Bemerkung 1",
      querverweise: "querverweise 1",
    },
    {
      key: 2,
      vertragsart: "Leasing",
      nummer: "Nummer 2",
      quadratmeterpreis: "2000",
      kaufpreis: "kaufpreis 2",
      note: "Text of note 2",
      kosten: [
        {
          key: 1,
          kostenart: "Leasing",
          betrag: "02.05.2023",
          anweisung: "01.06.2023",
        },
        {
          key: 2,
          kostenart: "Vermietung",
          betrag: "02.02.2023",
          anweisung: "02.06.2023",
        },
      ],
      resolution: [
        {
          key: 1,
          beschlussart: "Vermietung",
          datum: "01.05.2023",
        },
        {
          key: 2,
          beschlussart: "Leasing",
          datum: "01.05.2023",
        },
      ],
      voreigentümer: "Voreigentümer 2",
      auflassung: "Auflassung 2",
      eintragung: "Eintragung 2",
      bemerkung: "Bemerkung 2",
      querverweise: "querverweise 2",
    },
    {
      key: 3,
      vertragsart: "Leasing",
      nummer: "Nummer 3",
      quadratmeterpreis: "3000",
      kaufpreis: "kaufpreis 3",
      note: "Text of note 3",
      kosten: [
        {
          key: 1,
          kostenart: "Vermietung",
          betrag: "03.05.2023",
          anweisung: "03.06.2023",
        },
        {
          key: 2,
          kostenart: "Leasing",
          betrag: "04.02.2023",
          anweisung: "04.06.2023",
        },
      ],
      resolution: [
        {
          key: 1,
          beschlussart: "Vermietung",
          datum: "01.05.2023",
        },
        {
          key: 2,
          beschlussart: "Leasing",
          datum: "01.05.2023",
        },
      ],
      voreigentümer: "Voreigentümer 3",
      auflassung: "Auflassung 3",
      eintragung: "Eintragung 3",
      bemerkung: "Bemerkung 3",
      querverweise: "querverweise 3",
    },
    {
      key: 4,
      vertragsart: "Vermietung",
      nummer: "Nummer 4",
      quadratmeterpreis: "4000",
      kaufpreis: "kaufpreis 4",
      note: "Text of note 4",
      kosten: [
        {
          key: 1,
          kostenart: "Leasing",
          betrag: "01.05.2023",
          anweisung: "01.06.2023",
        },
        {
          key: 2,
          kostenart: "Vermietung",
          betrag: "02.02.2023",
          anweisung: "02.06.2023",
        },
      ],
      resolution: [
        {
          key: 1,
          beschlussart: "Vermietung",
          datum: "01.05.2023",
        },
        {
          key: 2,
          beschlussart: "Leasing",
          datum: "01.05.2023",
        },
      ],
      voreigentümer: "Voreigentümer 4",
      auflassung: "Auflassung 4",
      eintragung: "Eintragung 4",
      bemerkung: "Bemerkung 4",
      querverweise: "querverweise 4",
    },
  ];
};
const OperationsPage = ({
  dataIn,
  extractor = mockExtractor,
  width = "100%",
  height = "100%",
  inStory = false,
}) => {
  const data = extractor(dataIn);
  const landparcel = useSelector(getLandparcel);
  const jwt = useSelector(getJWT);
  const [activeRow, setActiveRow] = useState(data[0]);
  const [dataContract, setDataContract] = useState(data);
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      background: "gray",
      padding: "4px",
    };
  }
  return (
    <div
      style={{
        ...storyStyle,
        backgroundColor: "#F1F1F1",
      }}
      className="h-full"
    >
      <div className="h-[40%] mb-4">
        <Contracts dataIn={landparcel} extractor={contractsBlockExtractor} />
      </div>
      <div className="h-[calc(60%-2rem)] flex gap-4">
        <ContractData
          dataIn={landparcel}
          extractor={contractDataBlockExtractor}
        />
        <div className="w-full">
          <CrossReferences
            activeRow={activeRow}
            dataIn={landparcel}
            extractor={crossReferencesExtractor}
            crossExtractor={querverweiseContractExtractor}
            setActiveRow={setActiveRow}
            jwt={jwt}
          />
        </div>
      </div>
    </div>
  );
};

export default OperationsPage;
