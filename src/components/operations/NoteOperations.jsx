import InfoBlock from "../ui/Blocks/InfoBlock";
import CustomNotes from "../ui/notes/CustomNotes";
const NoteOperations = () => {
  return (
    <div className="shadow-md w-full" style={{ height: "100%" }}>
      <InfoBlock title="Bemerkung">
        <CustomNotes height={180} styles="p-3" />
      </InfoBlock>
    </div>
  );
};

export default NoteOperations;
