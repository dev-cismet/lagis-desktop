import { Input } from "antd";
const { TextArea } = Input;
const CustomNotes = ({ height }) => {
  return (
    <div
      style={{
        flexGrow: "1",
        padding: "0.8rem",
        display: "flex",
        flexDirection: "column",
        height: height - 64,
      }}
    >
      <TextArea
        className="shadow"
        style={{
          resize: "none",
          border: "none",
          outline: "none",
          flexGrow: "1",
        }}
      />
    </div>
  );
};

export default CustomNotes;
