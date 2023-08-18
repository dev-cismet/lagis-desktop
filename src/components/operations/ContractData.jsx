import { useState } from "react";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ContractForm from "../ui/forms/ContractForm";
import TableActionBTN from "../ui/btn/TableActionBTN";
const ContractData = ({ dataContract, activeRow }) => {
  const [showButton, setShowButton] = useState(false);
  return (
    <div className="contract-data shadow-md">
      <InfoBlock
        title="Vertragsdaten"
        controlBar={
          <TableActionBTN
            addRow={() => console.log("add an action")}
            deleteActiveRow={() => console.log("add an action")}
          />
        }
      >
        <ContractForm activeRow={activeRow} setShowButton={setShowButton} />
      </InfoBlock>
    </div>
  );
};

export default ContractData;
