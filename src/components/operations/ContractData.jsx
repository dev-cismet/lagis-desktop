import { useState } from "react";
import InfoBlock from "../ui/blocks/InfoBlock";
import ContractForm from "../ui/forms/ContractForm";
import { nanoid } from "@reduxjs/toolkit";
import ToggleModal from "../ui/control-board/ToggleModal";
import ModalForm from "../ui/forms/ModalForm";
const ContractData = ({ dataContract, activeRow }) => {
  const [showButton, setShowButton] = useState(false);
  return (
    <div className="contract-data shadow-md">
      <InfoBlock
        title="Vertragsdaten"
        controlBar={
          <ToggleModal>
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
            />
          </ToggleModal>
        }
      >
        <ContractForm activeRow={activeRow} setShowButton={setShowButton} />
      </InfoBlock>
    </div>
  );
};

export default ContractData;

{
  /* <TableActionBTN
            addRow={() => console.log("add an action")}
            deleteActiveRow={() => console.log("add an action")}
            editActive={()=> editActive()}
          /> */
}
