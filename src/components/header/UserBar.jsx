import HeaderSelectors from "../ui/filters/HeaderSelectors";
import UserBarActions from "../ui/control-board/UserBarActions";
import UserName from "./UserName";
import { LogoutOutlined } from "@ant-design/icons";
import { getJWT, storeJWT, storeLogin } from "../../store/slices/auth";
import { useEffect } from "react";
const UserBar = () => {
  // const [gemarkunk]
  // const gqlQuery = queries.first;
  // const queryParameter = {
  //   gemarkung: "Barmen",
  //   flur: 1,
  //   fstkZaehler: 367,
  //   fstkNenner: 0,
  // };
  useEffect(() => {}, []);
  return (
    <div className="flex items-center py-2">
      <div>
        <HeaderSelectors />
      </div>
      <div className="ml-10">
        <UserBarActions />
      </div>
      <div className="ml-auto flex gap-4 items-center">
        <UserName />
        <div className="logout ml-auto pr-1">
          <LogoutOutlined style={{ fontSize: "12px" }} />
          <span
            style={{ lineHeight: "22px" }}
            className="ml-2"
            onClick={() => {
              dispatch(storeJWT(undefined));
              dispatch(storeLogin(undefined));
            }}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};
export default UserBar;
