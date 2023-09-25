import { useState, useEffect } from "react";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ContractForm from "../ui/forms/ContractForm";
import { nanoid } from "@reduxjs/toolkit";
import ToggleModal from "../ui/control-board/ToggleModal";
import ModalForm from "../ui/forms/ModalForm";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
const ContractData = ({ dataIn, extractor }) => {
  const [contracts, setContracts] = useState([]);
  const [activeRow, setActiveRow] = useState();
  const dateFormat = "DD.MM.YYYY";
  const handleEdit = (updatedObject) => {
    const targetRow = contracts.find((c) => c.id === updatedObject.id);
    const copyRow = {
      ...targetRow,
      voreigentümer: updatedObject.voreigentümer,
      auflassung: updatedObject.auflassung,
      eintragung: updatedObject.eintragung,
      bemerkung: updatedObject.bemerkung,
    };
    setActiveRow(copyRow);
    setContracts(
      contracts.map((obj) => (obj.id === copyRow.id ? copyRow : obj))
    );
  };
  useEffect(() => {
    const data = extractor(dataIn);
    if (data?.length > 0) {
      setContracts(data);
      setActiveRow(data[0]);
    }
  }, [dataIn]);
  return (
    <div className="contract-data h-full w-full overflow-auto shadow-md">
      <InfoBlock
        title="Vertragsdaten"
        controlBar={
          <ToggleModal onlyEdit={true}>
            <ModalForm
              formName={activeRow?.id}
              customFields={[
                {
                  title: "Voreigentümer",
                  value: activeRow?.voreigentümer,
                  id: nanoid(),
                  name: "voreigentümer",
                },
                {
                  title: "Auflassung",
                  value:
                    activeRow?.auflassung === ""
                      ? null
                      : dayjs(activeRow?.auflassung, dateFormat),
                  name: "auflassung",
                  id: nanoid(),
                  type: "date",
                },
                {
                  title: "Eintragung",
                  id: nanoid(),
                  value:
                    activeRow?.eintragung === ""
                      ? null
                      : dayjs(activeRow?.eintragung, dateFormat),
                  name: "eintragung",
                  type: "date",
                },
                {
                  title: "Bemerkung",
                  value: activeRow?.bemerkung,
                  name: "bemerkung",
                  id: nanoid(),
                  type: "note",
                },
              ]}
              updateHandle={handleEdit}
            />
          </ToggleModal>
        }
      >
        <ContractForm activeRow={activeRow} updateHandle={handleEdit} />
      </InfoBlock>
    </div>
  );
};

export default ContractData;
