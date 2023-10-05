import UserName from "./UserName";
import { Tooltip } from "antd";
import { LogoutOutlined, FileSyncOutlined } from "@ant-design/icons";
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
  storeRebe,
  storeMipa,
  storeHistory,
  storeGeometry,
} from "../../store/slices/lagis";
import { getSyncLandparcel } from "../../store/slices/ui";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LandParcelChooser from "../chooser/LandParcelChooser";
import queries from "../../core/queries/online";
import { fetchGraphQL, fetchGraphQLFromWuNDa } from "../../core/graphql";
import { getBuffer25832 } from "../../core/tools/mappingTools";
import { removeLeadingZeros } from "../../core/tools/helper";
const UserBar = () => {
  const dispatch = useDispatch();
  const jwt = useSelector(getJWT);
  const userLogin = useSelector(getLogin);
  const syncLandparcel = useSelector(getSyncLandparcel);
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
    if (result.status === 401) {
      return navigate("/login");
    }
    const f = result?.data.flurstueck[0];
    f.alkisLandparcel = result?.data.alkis_flurstueck[0];
    dispatch(storeLagisLandparcel(f));
    dispatch(storeAlkisLandparcel(f.alkisLandparcel));

    let geo =
      result?.data.flurstueck[0].geom?.geo_field ||
      result?.data.flurstueck[0].alkisLandparcel?.geometrie;

    if (!geo) {
      const result = await getGeomFromWuNDa(alkis_id);
      geo = result.data.flurstueck[0].geom.geo_field;
      console.log("xxx geo was not set. is now:", geo);
    }
    dispatch(storeGeometry(geo));

    if (geo) {
      await getRebe(getBuffer25832(geo, -1));
      await getMipa(getBuffer25832(geo, -1));
    } else {
      dispatch(storeRebe());
      dispatch(storeMipa());
    }

    await getHistory(schluessel_id);
  };
  const getRebe = async (geo) => {
    const result = await fetchGraphQL(
      queries.getRebeByGeo,
      {
        geo,
      },
      jwt
    );
    dispatch(storeRebe(result?.data?.rebe));
  };
  const getMipa = async (geo) => {
    const result = await fetchGraphQL(
      queries.getMipaByGeo,
      {
        geo,
      },
      jwt
    );
    dispatch(storeMipa(result?.data?.mipa));
  };

  const getGeomFromWuNDa = async (alkis_id) => {
    const result = await fetchGraphQLFromWuNDa(
      queries.getGeomFromWuNDA,
      {
        alkis_id,
      },
      jwt
    );
    return result;
  };

  const getHistory = async (sid) => {
    console.log("xxx queries.getHistory", sid);
    try {
      const result = await fetchGraphQL(
        queries.history,
        {
          schluessel_id: sid,
        },
        jwt
      );
      dispatch(storeHistory(result?.data?.cs_calc_history));
    } catch (e) {
      console.log("xxx error in getHistory", e);
    }
  };
  const handleOpenLandparcelInJavaApp = (fstck) => {
    if (syncLandparcel) {
      const gemarkung = fstck.gemarkung;
      const flur = removeLeadingZeros(fstck.flur, true);
      const fstckArr = removeLeadingZeros(fstck.label).split("/");
      const zaehler = fstckArr[0];
      const nenner = fstckArr[1];
      fetch(
        `http://localhost:19000/loadFlurstueck?gemarkung=${gemarkung}&flur=${flur}&zaehler=${zaehler}&nenner=${nenner}`
      ).catch((error) => {
        //  i expect an error here
      });
    }
  };
  return (
    <div className="flex items-center py-2">
      <LandParcelChooser
        all={landParcels ? landParcels : []}
        gemarkungen={landmarks ? landmarks : []}
        flurstueckChoosen={(fstck) => {
          console.log("flurstueckChoosen", fstck);
          if (fstck.lfk) {
            getFlurstueck(fstck.lfk, fstck.alkis_id);
            handleOpenLandparcelInJavaApp(fstck);
          }
        }}
      />
      <div className="ml-auto flex gap-1 items-center">
        <div className="logout ml-auto pl-1 flex items-center">
          <Tooltip title="Ausloggen" placement="right">
            <LogoutOutlined
              className="text-sm cursor-pointer pr-4"
              onClick={() => {
                dispatch(storeAlkisLandparcel(undefined));
                dispatch(storeLagisLandparcel(undefined));
                dispatch(storeRebe(undefined));
                dispatch(storeMipa(undefined));
                dispatch(storeJWT(undefined));
                dispatch(storeLogin(undefined));
                dispatch(storeLandParcels(undefined));
                dispatch(storeLandmarks(undefined));
                dispatch(storeHistory(undefined));
                navigate("/login");
              }}
            />
          </Tooltip>
        </div>
        <UserName name={userLogin} />
      </div>
    </div>
  );
};
export default UserBar;
