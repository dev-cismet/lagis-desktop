import { useEffect, useState } from "react";
import InfoBlock from "../ui/Blocks/InfoBlock";
import CustomNotes from "../ui/notes/CustomNotes";
import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";
const NoteOperations = ({ dataContract, activeRow, setDataContract }) => {
  const contract = dataContract.find((c) => c.key === activeRow?.key);
  const [textNote, setTextNote] = useState("");
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    activeRow ? setTextNote(contract.note) : setTextNote("");
  }, [activeRow]);
  return (
    <div className="shadow-md w-full" style={{ height: "100%" }}>
      <InfoBlock
        title="Bemerkung"
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
        <CustomNotes
          height={180}
          styles="p-3"
          textValue={textNote}
          setTextNote={setTextNote}
          setShowButton={setShowButton}
        />
      </InfoBlock>
    </div>
  );
};

export default NoteOperations;
