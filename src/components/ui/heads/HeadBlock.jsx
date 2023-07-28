import { MenuOutlined } from "@ant-design/icons";
const HeadBlock = ({ title, children }) => {
  return (
    <div
      className="flex justify-between items-center px-3"
      style={{
        borderBottom: "1px solid #C4C4C4",
        backgroundColor: "#FFFFFF",
        borderRadius: "6px 6px 2px 2px",
      }}
    >
      <MenuOutlined style={{ fontSize: "14px" }} />
      <h3
        className="mx-0 my-3 text-left mr-auto ml-3 text-base"
        style={{ color: "#474747" }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
};

export default HeadBlock;
