import { MenuOutlined } from "@ant-design/icons";
const HeadBlock = ({ title, children }) => {
  return (
    <div
      className="flex justify-between items-center px-3"
      style={{
        borderBottom: "1px solid #C4C4C4",
      }}
    >
      <MenuOutlined />
      <h3
        className="mx-0 text-left mr-auto ml-3 text-base"
        style={{ color: "#474747" }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
};

export default HeadBlock;
