import { MenuOutlined } from "@ant-design/icons";
const HeadBlock = ({ title, children, titleAction }) => {
  return (
    <div
      className="flex justify-start items-center px-3"
      style={{
        borderBottom: "1px solid #C4C4C4",
        backgroundColor: "#FFFFFF",
        borderRadius: "6px 6px 2px 2px",
      }}
    >
      <MenuOutlined style={{ fontSize: "14px" }} />
      <h3
        className="mx-0 my-3 text-left ml-3 mr-3 text-base"
        style={{ color: "#474747" }}
      >
        {title}
      </h3>
      {titleAction && titleAction}
      <div className="ml-auto"> {children}</div>
    </div>
  );
};

export default HeadBlock;
