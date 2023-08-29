import HeaderSelectors from "../ui/filters/HeaderSelectors";
import UserBarActions from "../ui/control-board/UserBarActions";
import UserName from "./UserName";
import { LogoutOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getJWT, storeJWT, storeLogin } from "../../store/slices/auth";
const UserBar = () => {
  const dispatch = useDispatch();
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
