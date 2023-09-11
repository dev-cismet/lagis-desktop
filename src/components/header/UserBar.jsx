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
import {
  storeLandParcels,
  storeLandmarks,
  getLandParcels,
  getLandmarks,
} from "../../store/slices/landParcels";
import {
  storeLagisLandparcel,
  storeAlkisLandparcel,
  getUrlLandparcelParams,
} from "../../store/slices/lagisLandparcel";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import LandParcelChooser from "../chooser/LandParcelChooser";
import queries from "../../core/queries/online";
import { fetchGraphQL } from "../../core/graphql";
import { useEffect } from "react";
const UserBar = () => {
  const dispatch = useDispatch();
  const urlLandparcelParams = useSelector(getUrlLandparcelParams);
  const [urlParams, setUrlParams] = useSearchParams();
  const jwt = useSelector(getJWT);
  const userLogin = useSelector(getLogin);
  const navigate = useNavigate();
  const { landParcels } = useSelector(getLandParcels);
  const { landmarks } = useSelector(getLandmarks);
  const getFlurstueck = async (schluessel_id, alkis_id) => {
    const result = await fetchGraphQL(
      queries.getLagisLandparcelByFlurstueckSchluesselId,
      {
        schluessel_id,
        alkis_id,
      },
      jwt
    );
    console.log("xxx getFlurstueck Fetch result", result);
    const f = result?.data.flurstueck[0];
    f.alkisLandparcel = result?.data.alkis_flurstueck[0];
    dispatch(storeLagisLandparcel(f));
    dispatch(storeAlkisLandparcel(f.alkisLandparcel));
  };
  const setUrlHandle = (alkis_id) => {
    setUrlParams({ alkis_id });
  };
  useEffect(() => {
    if (urlLandparcelParams) {
      setUrlHandle(urlLandparcelParams?.alkisId);
    }
  }, [getFlurstueck]);
  useEffect(() => {
    const alkisId = urlParams.get("alkis_id");
    if (alkisId && urlLandparcelParams === undefined) {
      setUrlHandle(alkisId);
      console.log("get alkis_id from url!");
    }
  }, []);

  return (
    <div className="flex items-center py-2">
      <HeaderSelectors />
      <LandParcelChooser
        all={landParcels ? landParcels : []}
        gemarkungen={landmarks ? landmarks : []}
        flurstueckChoosen={(fstck) => {
          if (fstck.lfk) {
            console.log("choosen Id", fstck);
            getFlurstueck(fstck.lfk, fstck.alkis_id);
          }
        }}
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
              dispatch(storeLandParcels(undefined));
              dispatch(storeLandmarks(undefined));
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
