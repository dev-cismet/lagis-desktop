import InfoBlock from "../ui/Blocks/InfoBlock";
import ContractForm from "../ui/forms/ContractForm";

const ContractData = () => {
  return (
    <div className="contract-data shadow-md">
      <InfoBlock title="Vertragsdaten">
        <ContractForm />
      </InfoBlock>
    </div>
  );
};

export default ContractData;
