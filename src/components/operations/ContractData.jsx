import { useState } from "react";
import InfoBlock from "../ui/Blocks/InfoBlock";
import ContractForm from "../ui/forms/ContractForm";
import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";
const ContractData = ({ dataContract, activeRow }) => {
  const [showButton, setShowButton] = useState(false);
  return (
    <div className="contract-data shadow-md">
      <InfoBlock
        title="Vertragsdaten"
        controlBar={
          showButton &&
          activeRow && (
            <Button
              icon={
                <CheckOutlined
                  style={{
                    color: "#ffffff",
                    fontSize: "10px",
                  }}
                />
              }
              size={"small"}
              style={{
                background: "#00b96b",
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Button>
          )
        }
      >
        <ContractForm activeRow={activeRow} setShowButton={setShowButton} />
      </InfoBlock>
    </div>
  );
};

export default ContractData;
