import InfoBlock from "../ui/Blocks/InfoBlock";
import CustomNotes from "../ui/notes/CustomNotes";
const NoteOperations = () => {
  return (
    <div>
      <InfoBlock title="Bemerkung">
        <CustomNotes height={180} padding="1rem 0.8rem" />
      </InfoBlock>
    </div>
  );
};

export default NoteOperations;
