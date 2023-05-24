import axios from "axios";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Post, Put } from "../../AxiosFunction/AxiosFunction";
import Button from "../../Components/Button/Button";
import ForgotPasswordModal from "../../Components/ForgotPasswordModal";
import Input from "../../Components/Input/Input";
import OptVerificationModal from "../../Components/OptVerificationModal";
import { BaseUrl, validateEmail } from "../../Config/apiUrl";
import { Logoo, login, logo } from "../../Constant/ImagePath";
import { authReducer } from "../../redux/authSlice";
import classes from "./Login.module.css";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [otpVerificationModalOpen, setOtpVerificationModalOpen] =
    useState(false);

  const handleLogin = async () => {
    const apiUrl = BaseUrl("login");
    const body = {
      email,
      password,
    };
    for (let key in body) {
      if (body[key] == "" || body[key] == null) {
        return toast.error("Please Fill All Fields");
      }
    }
    if (!validateEmail(body?.email)) {
      return toast.error("Please Fill Valid Email");
    }

    setIsLoading(true);
    const response = await Post(apiUrl, body);
    if (response !== undefined) {
      await dispatch(authReducer(response?.data));
      toast.success("Login Successfully");
      setEmail("");
      setPassword("");
      navigate("/");
    }
    setIsLoading(false);
  };

  const handleForgotPassword = async (params) => {
    const apiUrl = BaseUrl(`password/forgot`);
    for (let key in params) {
      if (params[key] == "") {
        return toast.error("Please Fill Email Field");
      }
    }
    if (!validateEmail(params?.email)) {
      return toast.error("Please Fill Valid Email");
    }
    setIsForgot(true);
    const response = await Post(apiUrl, params);
    if (response !== undefined) {
      toast.success("Forgot Email Successfully");
      setModalOpen(false);
      setOtpVerificationModalOpen(true);
    }
    setIsForgot(false);
  };
  const handleOtpVerification = async (params) => {
    const apiUrl = BaseUrl(`password/reset`);
    for (let key in params) {
      if (params[key] == "") {
        return toast.error("Please fill all the Field");
      }
    }
    if (params?.newPassword !== params?.confirmPassword) {
      return toast.error(
        "The New password and confirmation password do not match."
      );
    }
    if (params?.otp?.length < 6) {
      return toast.error("Please fill OTP Code!");
    }
    setIsVerify(true);
    const response = await Put(apiUrl, params);
    if (response !== undefined) {
      toast.success("Verify Successfully");
      setOtpVerificationModalOpen(false);
    }
    setIsVerify(false);
  };

  return (
    <>
      <div className={classes.pageMain}>
        <div className={classes.leftMain}>
          <div className={classes.leftImageMain}>
            <img src={login} />
          </div>
        </div>
        <div className={classes.rightMain}>
          <div className={classes.headerMain}>
            <div className={classes.sideLogoMain}>
              <div onClick={() => navigate("/")} className={classes.logoMian}>
                <img src={Logoo} />
              </div>
            </div>

            <div className={classes.alreadyMain}>
              <Link to={"/signup"}>Dont have account ?</Link>
              <Button onClick={() => navigate("/signup")} label={"Signup"} />
            </div>
          </div>

          <h2>Login Now!</h2>
          <Row className={"gy-4"}>
            <Col md={12}>
              <Input
                setter={setEmail}
                value={email}
                label={"Email"}
                placeholder={"Email"}
              />
            </Col>
            <Col md={12}>
              <Input
                setter={setPassword}
                value={password}
                type={"password"}
                label={"Password"}
                placeholder={"Password"}
              />
              <span className={classes.foogotPass}>
                {" "}
                <p onClick={() => setModalOpen(true)}>
                  Forgotten Password ?
                </p>{" "}
              </span>
            </Col>
            <Col md={12}>
              <div className={classes.btnMain}>
                <Button
                  disabled={isLoading}
                  onClick={handleLogin}
                  label={isLoading ? "Loading..." : "LOGIN"}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {modalOpen && (
        <ForgotPasswordModal
          setShow={setModalOpen}
          show={modalOpen}
          handleForgotPassword={handleForgotPassword}
          isForgot={isForgot}
        />
      )}
      {otpVerificationModalOpen && (
        <OptVerificationModal
          setShow={setOtpVerificationModalOpen}
          show={otpVerificationModalOpen}
          isVerify={isVerify}
          handleOtpVerification={handleOtpVerification}
        />
      )}
    </>
  );
};

export default Login;
