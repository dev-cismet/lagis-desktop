import React, { useEffect } from "react";
import { Col, Row, Typography, Input, Checkbox, Button } from "antd";
import logo from "../../assets/logo.png";
import loginLeft from "../../assets/loginLeft.png";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getJWT,
  setLoginRequested,
  storeJWT,
  storeLogin,
  authStart,
  authFailure,
  authStopLoading,
  getAuthLoading,
} from "../../store/slices/auth";
import {
  storeAlkisLandparcel,
  storeLagisLandparcel,
  storeRebe,
  storeMipa,
} from "../../store/slices/lagis";
import { DOMAIN, REST_SERVICE } from "../../constants/lagis";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import useDevSecrets from "../../core/hooks/useDevSecrets";

const LoginPage = () => {
  const { user: devSecretUser, pw: devSecretPassword } = useDevSecrets();

  const jwt = useSelector(getJWT);
  const loading = useSelector(getAuthLoading);
  const dispatch = useDispatch();
  const [user, setUser] = useState(devSecretUser);

  const [pw, setPw] = useState(devSecretPassword);
  const [keepStatus, setKeepStatus] = useState(false);
  const navigate = useNavigate();
  const loginHandle = (e) => {
    setUser(e.target.value);
  };
  const passwordnHandle = (e) => {
    setPw(e.target.value);
  };
  const keepStatusHandle = (e) => {
    setKeepStatus(e.target.checked);
  };
  const login = (user, pw, dispatch) => {
    dispatch(authStart());

    let u, p;

    // can be removed if the form gets proper populated with the devSecrets
    if (user === null || user === undefined || user === "") {
      u = devSecretUser;
    } else {
      u = user;
    }

    if (pw === null || pw === undefined || pw === "") {
      p = devSecretPassword;
    } else {
      p = pw;
    }

    fetch(REST_SERVICE + "/users", {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(u + "@" + DOMAIN + ":" + p),
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          response.json().then(function (responseWithJWT) {
            const jwt = responseWithJWT.jwt;
            setTimeout(() => {
              dispatch(storeAlkisLandparcel(undefined));
              dispatch(storeLagisLandparcel(undefined));
              dispatch(storeRebe(undefined));
              dispatch(storeMipa(undefined));
              dispatch(storeJWT(jwt));
              dispatch(storeLogin(u));
              dispatch(setLoginRequested(false));
              navigate("/");
            }, 500);
          });
        } else {
          dispatch(authStopLoading());
        }
      })
      .catch(function (err) {
        console.log("error", err);
        dispatch(authFailure(err));
      });
  };
  const clickHandle = () => {
    login(user, pw, dispatch);
  };
  // if (loading) {
  //   return <Spin />;
  // }

  console.log("login", { user, pw, devSecretUser, devSecretPassword });

  return (
    <>
      <div className="login-page">
        <div className="h-screen">
          <div className="w-full flex h-full items-center justify-center bg-rain relative bg-cover">
            <div className="h-screen absolute w-full backdrop-blur" />
            <div className="flex flex-col gap-8 items-center bg-white/30 z-20 p-10 h-fit lg:w-1/3 w-2/3 rounded-3xl">
              <h1 class="text-white/80 font-semibold text-6xl">
                Lagis Desktop
              </h1>
              <Input
                placeholder="Email ID"
                type="email"
                onChange={loginHandle}
              />
              <Input.Password
                initialValue="xx"
                placeholder="input password"
                onChange={passwordnHandle}
              />
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={clickHandle}
              >
                Anmeldung
              </Button>
            </div>
            <div className="absolute top-6 left-6 w-20">
              <img src={logo} alt="logo" />
              {/* <span className="text-base font-semibold ml-auto">
                LagIS-online
              </span> */}
            </div>

            <div className="absolute top-6 right-6 text-white/80 font-semibold flex flex-col gap-2 items-end text-right sm:max-w-none max-w-[200px]">
              <span>Stadt Wuppertal</span>
              <span>Vermessung, Katasteramt und Geodaten</span>
              <span>102.23 Kommunalservice Liegenschaftskataster</span>
            </div>
            <div className="absolute bottom-6 right-6 text-white/80 font-semibold flex flex-col gap-2 items-end">
              <span>
                {/* VerDIS Desktop v:{packageJson.version}{" "} */}
                <a
                  href="https://cismet.de"
                  className="text-white/50 no-underline"
                >
                  cismet GmbH
                </a>{" "}
                auf Basis von
              </span>
              <span>
                <a
                  href="https://leafletjs.com/"
                  className="text-white/50 no-underline"
                >
                  Leaflet
                </a>{" "}
                und{" "}
                <a
                  href="https://cismet.de/#refs"
                  className="text-white/50 no-underline"
                >
                  cids | react cismap v
                  {/* {packageJson.dependencies["react-cismap"].slice(1)} | */}
                </a>
              </span>
              <a
                href="https://cismet.de/datenschutzerklaerung.html"
                className="text-white/50 no-underline"
              >
                Datenschutzerklärung (Privacy Policy)
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
