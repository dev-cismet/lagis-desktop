import { Avatar, Space } from "antd";

const UserName = ({ name = "User" }) => {
  const firstLetter = name.charAt(0);
  return (
    <Space size={16}>
      <span>Hallo, {name}</span>
      <Avatar style={{ background: "#4ABC96" }}>{firstLetter}</Avatar>
    </Space>
  );
};

export default UserName;
