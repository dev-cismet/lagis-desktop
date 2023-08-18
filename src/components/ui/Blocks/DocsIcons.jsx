import { CopyOutlined, SnippetsOutlined } from "@ant-design/icons";
const DocsIcons = ({ classnames }) => {
  const iconSize = "17px";
  return (
    <div className={classnames}>
      <SnippetsOutlined
        className="mx-1"
        style={{ color: "#1890FF", fontSize: iconSize }}
      />
      <CopyOutlined style={{ color: "#1890FF", fontSize: iconSize }} />
    </div>
  );
};

export default DocsIcons;
