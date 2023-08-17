import InfoBlock from "../ui/Blocks/InfoBlock";
import ContractForm from "../ui/forms/ContractForm";

const ContractData = ({ dataContract, activeRow }) => {
  return (
    <div className="contract-data shadow-md">
      <InfoBlock title="Vertragsdaten">
        <ContractForm activeRow={activeRow} />
      </InfoBlock>
    </div>
  );
};

export default ContractData;
