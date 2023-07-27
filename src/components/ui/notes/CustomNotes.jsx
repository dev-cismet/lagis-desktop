import { Input } from "antd";
const { TextArea } = Input;
const CustomNotes = () => {
  return (
    <div
      style={{
        flexGrow: "1",
        padding: "0.8rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextArea
        className="shadow"
        style={{
          resize: "none",
          border: "none",
          outline: "none",
          flexGrow: "1",
          minHeight: "180px",
        }}
      />
    </div>
  );
};

export default CustomNotes;
