import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Get, Post } from "../../AxiosFunction/AxiosFunction";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import { BaseUrl, validateEmail } from "../../Config/apiUrl";
import { Logoo, login, logo, signup } from "../../Constant/ImagePath";
import ProfileWithEditBtn from "../../Components/ProfileWithEditBtn";
import classes from "./Signup.module.css";
import PhoneInput from "react-phone-input-2";
const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  console.log(typeof avatarPreview, "rolerolerolerole");
  const handleSignup = async () => {
    const apiUrl = BaseUrl("register");
    const name = `${firstName} ${lastName}`;
    const body = {
      name,
      email,
      phone: Number(phone),
      role,
      password,
      avatar,
    };
    for (let key in body) {
      if (body[key] == "" || body[key] == null) {
        return toast.error("Please Fill All Fields");
      }
    }
    if (body?.password !== confirmPassword) {
      return toast.error(
        "The password and confirmation password do not match."
      );
    }
    if (!validateEmail(body?.email)) {
      return toast.error("Please Fill Valid Email");
    }
    if (body?.password?.length < 8) {
      return toast.error("Password Should be greater than 8 character");
    }
    const myForm = new FormData();
    myForm.append("name", body?.name);
    myForm.append("email", body?.email);
    myForm.append("phone", body?.phone);
    myForm.append("role", body?.role);
    myForm.append("password", body?.password);
    myForm.append("avatar", body?.avatar);
    setIsLoading(true);
    const response = await Post(apiUrl, myForm);
    if (response !== undefined) {
      toast.success("Signup Successfully");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    }
    setIsLoading(false);
  };

  return (
    <>
      <style>
        {`
      .react-tel-input .form-control{
        width:100% !important;
        height:48px !important;
        background: var(--white-color) !important;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important;
        border:none !important;
      }
      .react-tel-input .flag-dropdown{
          border:none !important;
          background-color: #ebebeb !important;
      }
      `}
      </style>
      <div className={classes.pageMain}>
        <div className={classes.leftMain}>
          <div className={classes.leftImageMain}>
            <img src={signup} />
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
              <Link to={"/login"}>Already have account ?</Link>
              <Button onClick={() => navigate("/login")} label={"Login"} />
            </div>
          </div>

          <h2>Signup Now!</h2>
          <Row className={"gy-4"}>
            <Col md={12}>
              <div className={classes.roleMain}>
                <span>
                  <input
                    onChange={() => setRole("student")}
                    type={"radio"}
                    name={"role"}
                    checked={role == "student"}
                  />
                  As a Student
                </span>
                |
                <span>
                  <input
                    onChange={() => setRole("tutor")}
                    type={"radio"}
                    name={"role"}
                  />
                  As a Tutor
                </span>
              </div>
            </Col>
            <Col md={12}>
              <ProfileWithEditBtn
                setAvatar={setAvatar}
                setAvatarPreview={setAvatarPreview}
                avatarPreview={avatarPreview}
              />
              <p className="mt-3">
                Upload Your profile picture(max file size: 50 KB)
              </p>
            </Col>
            <Col xl={6} lg={12}>
              <Input
                setter={setFirstName}
                value={firstName}
                label={"First Name"}
                placeholder={"First Name"}
              />
            </Col>
            <Col xl={6} lg={12}>
              <Input
                setter={setLastName}
                value={lastName}
                label={"Last Name"}
                placeholder={"Last Name"}
              />
            </Col>
            <Col xl={6} lg={12}>
              <div className={classes.phoneInputMain}>
                <label>Phone</label>
                <PhoneInput
                  country={"pk"}
                  placeholder={"Phone"}
                  value={String(phone)}
                  onChange={(phone) => setPhone(String(phone))}
                />
              </div>
            </Col>
            <Col xl={6} lg={12}>
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
            </Col>
            <Col md={12}>
              <Input
                setter={setConfirmPassword}
                value={confirmPassword}
                type={"password"}
                label={"Confirm Password"}
                placeholder={"Confirm Password"}
              />
            </Col>
            <Col md={12}>
              <div className={classes.btnMain}>
                <Button
                  disabled={isLoading}
                  onClick={handleSignup}
                  label={isLoading ? "Loading..." : "SIGNUP"}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Signup;
