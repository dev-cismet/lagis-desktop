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
        Authorization: "Basic " + btoa(devSecretUser + "@" + DOMAIN + ":" + p),
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
        <Row>
          <Col span={12}>
            <div
              style={{
                backgroundColor: "rgba(205, 224, 242, 0.48)",
                padding: "50px",
                height: "100vh",
              }}
            >
              <div className="logo-div">
                <img src={`${logo}`} alt="" />
                <Typography
                  style={{
                    fontWeight: "600",
                    marginTop: "2px",
                    marginLeft: "10px",
                    fontSize: "20px",
                  }}
                >
                  LagIS-online
                </Typography>
              </div>
              <div className="left-section-content">
                <Typography
                  style={{
                    color: "rgba(38, 38, 38, 0.85)",
                    textAlign: "center",
                    fontSize: "25px",
                    marginTop: "20px",
                  }}
                >
                  Nice to see you again.
                </Typography>
                <Typography
                  style={{
                    color: "#1890FF",
                    textAlign: "center",
                    fontSize: "50px",
                    marginTop: "10px",
                  }}
                >
                  Welcome Back!
                </Typography>
                <div className="title-border"></div>
                <img
                  src={`${loginLeft}`}
                  alt=""
                  style={{ marginTop: "100px" }}
                />
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <div
                style={{
                  backgroundColor: "#F2F2F2",
                  padding: "50px",
                  height: "100vh",
                }}
              >
                <div className="right-section-content">
                  <Typography
                    style={{
                      color: "#1890FF",
                      textAlign: "center",
                      fontSize: "36px",
                      marginTop: "100px",
                    }}
                  >
                    Login to your account
                  </Typography>
                  <Typography
                    style={{
                      color: "rgba(38, 38, 38, 0.85)",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                  >
                    And start tracking
                  </Typography>
                  <div className="form">
                    <Input
                      placeholder="Email ID"
                      type="email"
                      onChange={loginHandle}
                    />
                    <Input.Password
                      initialValue="xx"
                      placeholder="input password"
                      onChange={passwordnHandle}
                      style={{ marginTop: "30px" }}
                    />
                    <div
                      className="keep-signin"
                      style={{ marginTop: "10px", marginBottom: "30px" }}
                    >
                      <Row>
                        <Col span={12}>
                          <Checkbox onChange={keepStatusHandle}>
                            Keep me signed in
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Typography
                            style={{
                              color: "#1890FF",
                              textAlign: "right",
                              fontSize: "15px",
                            }}
                          >
                            Already a member?
                          </Typography>
                        </Col>
                      </Row>
                    </div>
                    <Button
                      type="primary"
                      style={{ width: "100%" }}
                      onClick={clickHandle}
                    >
                      Log in
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default LoginPage;
