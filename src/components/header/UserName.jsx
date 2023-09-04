import { Avatar, Space } from "antd";
const UserName = ({ name = "User" }) => {
  const firstLetter = name.charAt(0);
  return (
    <div className="hidden md:block">
      <span style={{ fontSize: "13px" }} className="mr-2">
        {name}
      </span>
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
    </div>
  );
};

export default UserName;
