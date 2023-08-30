import { Avatar, Space } from "antd";
const UserName = ({ name = "User" }) => {
  const firstLetter = name.charAt(0);
  return (
    <Space size={8}>
      <span style={{ fontSize: "13px" }}>{name}</span>
      <Avatar
        size="small"
        style={{
          background: "#4ABC96",
        }}
      >
        <span className="uppercase" style={{ fontSize: "12px" }}>
          {firstLetter}
        </span>
      </Avatar>
    </Space>
  );
};

export default UserName;
