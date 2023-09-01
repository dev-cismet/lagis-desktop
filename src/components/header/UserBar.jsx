import HeaderSelectors from "../ui/filters/HeaderSelectors";
import UserBarActions from "../ui/control-board/UserBarActions";
import UserName from "./UserName";
import { LogoutOutlined } from "@ant-design/icons";
import {
  getJWT,
  getLogin,
  storeJWT,
  storeLogin,
} from "../../store/slices/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LandParcelChooser from "../chooser/LandParcelChooser";
const UserBar = () => {
  const dispatch = useDispatch();
  const jwt = useSelector(getJWT);
  const userLogin = useSelector(getLogin);
  const navigate = useNavigate();
  return (
    <div className="flex items-center py-2">
      {/* <HeaderSelectors /> */}

      <LandParcelChooser />
      <div className="ml-10">
        <UserBarActions />
      </div>
      <div className="ml-auto flex gap-2 items-center">
        <UserName name={userLogin} />
        <div className="logout ml-auto pr-1">
          <LogoutOutlined style={{ fontSize: "12px" }} />
          <span
            style={{ lineHeight: "22px", fontSize: "13px" }}
            className="ml-1"
            onClick={() => {
              dispatch(storeJWT(undefined));
              dispatch(storeLogin(undefined));
              navigate("/login");
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
