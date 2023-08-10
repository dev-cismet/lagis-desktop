import { Avatar, Space } from "antd";
const UserName = ({ name = "User" }) => {
  const firstLetter = name.charAt(0);
  return (
    <Space size={8}>
      <span>Hallo, {name}</span>
      <Avatar size="small" style={{ background: "#4ABC96" }}>
        {firstLetter}
      </Avatar>
    </Space>
  );
};

export default UserName;
