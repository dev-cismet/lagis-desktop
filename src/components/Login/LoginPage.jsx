import React from "react";
import { Input, Button } from "antd";
import wupperwurm from "../../assets/wupperwurm.svg";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getAuthLoading, login } from "../../store/slices/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDevSecrets from "../../core/hooks/useDevSecrets";
import packageJson from "../../../package.json";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const { user: devSecretUser, pw: devSecretPassword } = useDevSecrets();

  const loading = useSelector(getAuthLoading);
  const dispatch = useDispatch();
  const [user, setUser] = useState(devSecretUser);

  const [pw, setPw] = useState(devSecretPassword);
  const navigate = useNavigate();
  const loginHandle = (e) => {
    setUser(e.target.value);
  };
  const passwordnHandle = (e) => {
    setPw(e.target.value);
  };

  const clickHandle = () => {
    login(user, pw, dispatch, navigate);
  };

  return (
    <>
      <div className="login-page">
        <div className="h-screen">
          <div className="w-full flex h-full items-center justify-center bg-rain relative bg-cover">
            <div className="h-screen absolute w-full backdrop-blur" />
            <div className="flex flex-col gap-8 items-center bg-white/30 z-20 p-10 h-fit lg:w-1/3 w-2/3 rounded-3xl">
              <h1 className="text-white/80 font-semibold text-6xl">
                LagIS Desktop
              </h1>
              <div className="flex flex-col gap-6 w-full">
                <h3
                  className="border-b-2 border-0 w-fit border-solid"
                  style={{ color: "#1677ff", marginBottom: "8px" }}
                >
                  Anmeldung
                </h3>
                <Input
                  placeholder="Nutzername"
                  type="email"
                  onChange={loginHandle}
                  prefix={<UserOutlined />}
                  style={{ marginBottom: "20px" }}
                />
                <Input.Password
                  placeholder="Passwort"
                  onChange={passwordnHandle}
                  prefix={<LockOutlined />}
                  style={{ marginBottom: "20px" }}
                />
                <Button
                  type="primary"
                  size="large"
                  loading={loading}
                  className="w-fit text-left"
                  onClick={clickHandle}
                >
                  Anmeldung
                </Button>
              </div>
            </div>
            <img
              src={wupperwurm}
              alt="Wupperwurm"
              className="absolute top-6 left-6 w-40"
            />
            <div className="absolute top-6 right-6 text-white/80 font-semibold flex flex-col gap-2 items-end text-right sm:max-w-none max-w-[200px]">
              <span>Stadt Wuppertal</span>
              <span>Vermessung, Katasteramt und Geodaten</span>
              <span>102.23 Kommunalservice Liegenschaftskataster</span>
            </div>
            <div className="absolute bottom-6 right-6 text-white/80 font-semibold flex flex-col gap-2 items-end">
              <span>
                LagIS Desktop v:{packageJson.version}{" "}
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
                  {packageJson.dependencies["react-cismap"].slice(1)} |
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
