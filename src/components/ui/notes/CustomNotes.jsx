import { Input } from "antd";
const { TextArea } = Input;
const CustomNotes = ({ height = 250, styles }) => {
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
          // border: "none",
          outline: "none",
          flexGrow: 1,
          minHeight: "140px",
        }}
      />
    </div>
  );
};

export default CustomNotes;
