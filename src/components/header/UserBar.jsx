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
} from "../../store/slices/lagis";
import { getToggleDrawer } from "../../store/slices/ui";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import LandParcelChooser from "../chooser/LandParcelChooser";
import queries from "../../core/queries/online";
import { fetchGraphQL } from "../../core/graphql";
import { useEffect, useState } from "react";
import { getBuffer25832 } from "../../core/tools/mappingTools";
const UserBar = () => {
  const dispatch = useDispatch();
  const [urlParams, setUrlParams] = useSearchParams();
  const jwt = useSelector(getJWT);
  const userLogin = useSelector(getLogin);
  const toggleDrawer = useSelector(getToggleDrawer);
  const navigate = useNavigate();
  const { landParcels } = useSelector(getLandParcels);
  const { landmarks } = useSelector(getLandmarks);
  const [parametersForLink, setParametersForLink] = useState();
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
    const geo = result?.data.flurstueck[0].alkisLandparcel?.geometrie;
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
      // console.log(
      //   generateGraphString(result?.data?.cs_calc_history, "default")
      // );
      dispatch(storeHistory(result?.data?.cs_calc_history));
    } catch (e) {
      console.log("xxx error in getHistory", e);
    }
  };
  const setUrlHandle = (alkis_id) => {
    setUrlParams({ alkis_id });
  };
  const handleOpenLandparcelInJavaApp = () => {
    if (toggleDrawer && parametersForLink) {
      const fstckArr = parametersForLink.fstck.split("-");
      const zaehler = fstckArr[0];
      const nenner = fstckArr[1];
      fetch(
        `http://localhost:19000/loadFlurstueck?gemarkung=${parametersForLink.gem}&flur=${parametersForLink.flur}&zaehler=${zaehler}&nenner=${nenner}`
      ).catch((error) => {
        //  i expect an error here
      });
    }
  };
  useEffect(() => {
    const fromUrl = {
      gem: urlParams.get("gem") || undefined,
      flur: urlParams.get("flur") || undefined,
      fstck: urlParams.get("fstck") || undefined,
    };
    if (fromUrl.gem && fromUrl.flur && fromUrl.fstck) {
      setParametersForLink(fromUrl);
    } else {
      setParametersForLink(undefined);
    }
  }, [urlParams]);
  return (
    <div className="flex items-center py-2">
      {/* <HeaderSelectors /> */}
      <LandParcelChooser
        all={landParcels ? landParcels : []}
        gemarkungen={landmarks ? landmarks : []}
        flurstueckChoosen={(fstck) => {
          console.log("flurstueckChoosen", fstck);

          if (fstck.lfk) {
            getFlurstueck(fstck.lfk, fstck.alkis_id);
          }
        }}
        // gemParams={urlParams.get("gem")}
        // flurParams={flurParam ? addLeadingZeros(flurParam) : undefined}
        // fstckParams={fstckParam ? replaceWithSlash(fstckParam) : undefined}
      />
      {/* <div className="mx-2 md:ml-4">
        <UserBarActions />
      </div> */}
      <div className="ml-auto flex gap-1 items-center">
        <div className="logout ml-auto pl-1 flex items-center">
          <Tooltip title="LagIS Java sync" placement="right">
            <FileSyncOutlined
              className="text-sm cursor-pointer pr-4 "
              onClick={handleOpenLandparcelInJavaApp}
            />
          </Tooltip>
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
          {/* <LogoutOutlined style={{ fontSize: "12px" }} />
          <span
            style={{ lineHeight: "22px", fontSize: "13px" }}
            className="ml-1 hidden md:block"
            onClick={() => {
              dispatch(storeAlkisLandparcel(undefined));
              dispatch(storeLagisLandparcel(undefined));
              dispatch(storeRebe(undefined));
              dispatch(storeMipa(undefined));
              dispatch(storeJWT(undefined));
              dispatch(storeLogin(undefined));
              dispatch(storeLandParcels(undefined));
              dispatch(storeLandmarks(undefined));
              navigate("/login");
            }}
          >
            Logout
          </span> */}
        </div>
        <UserName name={userLogin} />
      </div>
    </div>
  );
};
export default UserBar;

function replaceWithSlash(inputString) {
  if (!inputString) {
    return undefined;
  }
  const convertInput = inputString.toString();
  if (!convertInput.includes("-")) {
    return `${inputString}/0`;
  } else {
    return inputString.replace(/[\-\/]/g, "/");
  }
}
