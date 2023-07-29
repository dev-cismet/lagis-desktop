import { CopyOutlined, SnippetsOutlined } from "@ant-design/icons";
const DocsIcons = ({ classnames }) => {
  return (
    <div className={classnames}>
      <SnippetsOutlined
        className="text-base mx-1"
        style={{ color: "#1890FF", fontSize: "15px" }}
      />
      <CopyOutlined
        className="text-base mx-1"
        style={{ color: "#1890FF", fontSize: "15px" }}
      />
    </div>
  );
};

export default DocsIcons;
