import { useEffect, useState } from "react";
import InfoBlock from "../ui/Blocks/InfoBlock";
import CustomNotes from "../ui/notes/CustomNotes";
const NoteOperations = ({ dataContract, activeRow, setDataContract }) => {
  const contract = dataContract.find((c) => c.key === activeRow?.key);
  const [textNote, setTextNote] = useState("");

  useEffect(() => {
    activeRow ? setTextNote(contract.note) : setTextNote("");
  }, [activeRow]);
  return (
    <div className="shadow-md w-full" style={{ height: "100%" }}>
      <InfoBlock title="Bemerkung">
        <CustomNotes
          height={180}
          styles="p-3"
          textValue={textNote}
          setTextNote={setTextNote}
        />
      </InfoBlock>
    </div>
  );
};

export default NoteOperations;
