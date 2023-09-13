import { useState } from "react";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ContractForm from "../ui/forms/ContractForm";
import { nanoid } from "@reduxjs/toolkit";
import ToggleModal from "../ui/control-board/ToggleModal";
import ModalForm from "../ui/forms/ModalForm";
const ContractData = ({
  dataContract,
  activeRow,
  setDataContract,
  setActiveRow,
}) => {
  const handleEdit = (updatedObject) => {
    const targetRow = dataContract.find((c) => c.key === updatedObject.key);
    const copyRow = {
      ...targetRow,
      voreigentümer: updatedObject.voreigentümer,
      auflassung: updatedObject.auflassung,
      eintragung: updatedObject.eintragung,
      bemerkung: updatedObject.bemerkung,
    };
    setActiveRow(copyRow);
    setDataContract(
      dataContract.map((obj) => (obj.key === copyRow.key ? copyRow : obj))
    );
  };
  return (
    <div className="contract-data h-full w-full overflow-auto shadow-md">
      <InfoBlock
        title="Vertragsdaten"
        controlBar={
          <ToggleModal onlyEdit={true}>
            <ModalForm
              formName={activeRow?.key}
              customFields={[
                {
                  title: "Voreigentümer",
                  value: activeRow.voreigentümer,
                  key: nanoid(),
                  name: "voreigentümer",
                },
                {
                  title: "Auflassung",
                  value: activeRow?.auflassung,
                  name: "auflassung",
                  key: nanoid(),
                },
                {
                  title: "Eintragung",
                  key: nanoid(),
                  value: activeRow?.eintragung,
                  name: "eintragung",
                },
                {
                  title: "Bemerkung",
                  value: activeRow?.bemerkung,
                  name: "bemerkung",
                  key: nanoid(),
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
