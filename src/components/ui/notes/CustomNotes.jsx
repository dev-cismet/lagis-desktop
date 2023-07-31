import { Input } from "antd";
const { TextArea } = Input;
const CustomNotes = ({ height = 250 }) => {
  return (
    <div
      className="custom-text"
      style={{
        // padding: "0.8rem",
        height: "100%",
      }}
    >
      <TextArea
        className="shadow"
        style={{
          resize: "none",
          border: "none",
          outline: "none",
          minHeight: height - 64,
        }}
      />
    </div>
  );
};

export default CustomNotes;
