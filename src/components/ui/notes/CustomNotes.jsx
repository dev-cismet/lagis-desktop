import { Input } from "antd";
const { TextArea } = Input;
const CustomNotes = ({
  styles,
  textValue = "",
  setTextNote,
  setShowButton,
}) => {
  const handleOnChange = (e) => {
    setTextNote(e.target.value);
    setShowButton(true);
  };
  return (
    <div
      className={styles}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextArea
        className="shadow-md"
        style={{
          resize: "none",
          outline: "none",
          flexGrow: 1,
        }}
        value={textValue}
        onChange={(e) => handleOnChange(e)}
      />
    </div>
  );
};

export default CustomNotes;
