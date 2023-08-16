import { Input } from "antd";
const { TextArea } = Input;
const CustomNotes = ({ styles, textValue = "", setTextNote }) => {
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
        onChange={(e) => setTextNote(e.target.value)}
      />
    </div>
  );
};

export default CustomNotes;
