import { Input } from "antd";
const { TextArea } = Input;
const CustomNotes = ({ styles }) => {
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
        className="shadow-md "
        style={{
          resize: "none",
          outline: "none",
          flexGrow: 1,
          // minHeight: "80px",
        }}
      />
    </div>
  );
};

export default CustomNotes;
