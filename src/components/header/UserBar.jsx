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
import { getLandParcels, getLandmarks } from "../../store/slices/landParcels";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LandParcelChooser from "../chooser/LandParcelChooser";
const UserBar = () => {
  const dispatch = useDispatch();
  const jwt = useSelector(getJWT);
  const userLogin = useSelector(getLogin);
  const navigate = useNavigate();
  const { landParcels } = useSelector(getLandParcels);
  const { landmarks } = useSelector(getLandmarks);
  return (
    <div className="flex items-center py-2">
      {/* <HeaderSelectors /> */}
      <LandParcelChooser
        all={landParcels ? landParcels : []}
        gemarkungen={landmarks ? landmarks : []}
      />
      <div className="mx-2 md:ml-4">
        <UserBarActions />
      </div>
      <div className="ml-auto flex gap-2 items-center">
        <UserName name={userLogin} />
        <div className="logout ml-auto pl-1 flex items-center">
          <LogoutOutlined style={{ fontSize: "12px" }} />
          <span
            style={{ lineHeight: "22px", fontSize: "13px" }}
            className="ml-1 hidden md:block"
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
