import React from "react";
import { Col, Row, Typography, Input, Checkbox, Button } from "antd";
import logo from "../../assets/logo.png";
import loginLeft from "../../assets/loginLeft.png";
import "./style.css";

const LoginPage = () => {
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };
   
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
                  <Input placeholder="Email ID" type="email" />
                  <Input.Password placeholder="input password" style={{marginTop:"30px"}} />
                    <div className="keep-signin" style={{marginTop:"10px", marginBottom:"30px"}}>
                        <Row>
                            <Col span={12}>
                            <Checkbox onChange={onChange}>Keep me signed in</Checkbox>
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
                    <Button type="primary" style={{width:"100%"}}>Log in</Button>
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
