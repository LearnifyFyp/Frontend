import React, { useState } from "react";
import classes from "./UpdatePassword.module.css";
import { Col, Row } from "react-bootstrap";
import Input from "../../Components/Input/Input";
import NavBar from "../../Components/NavBar";
import Button from "../../Components/Button/Button";
import { BaseUrl } from "../../Config/apiUrl";
import { Post, Put } from "../../AxiosFunction/AxiosFunction";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import HeroSection from "../../Components/HeroSection";
import Footer from "../../Components/Footer";
const UpdatePassword = () => {
  const token = useSelector((state) => state?.authReducer?.token);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isApiCall, setIsApiCall] = useState(false);
  const handleUpdate = async () => {
    const apiUrl = BaseUrl(`password/update`);
    const body = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    for (let key in body) {
      if (body[key] === "" || body[key] === null) {
        return toast.error("Please fill all the fields");
      }
    }
    if (body?.newPassword !== body?.confirmPassword) {
      return toast.error(
        "The New password and confirmation password do not match."
      );
    }
    setIsApiCall(true);
    const response = await Put(apiUrl, body, token);
    if (response !== undefined) {
      toast.success("Password Update Successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setIsApiCall(false);
  };
  return (
    <>
      <NavBar />
      <HeroSection
        heading={"Update Password"}
        para={
          "In publ commonly used to demonstrate the visual form of a document or a typeface without relying"
        }
      />
      <div className={classes.updatePassword}>
        <Row className="gy-5">
          <Col md={12}>
            <Input
              setter={setOldPassword}
              value={oldPassword}
              type={"password"}
              label={"Old Password"}
              placeholder={"Old Password"}
            />
          </Col>
          <Col md={12}>
            <Input
              setter={setNewPassword}
              value={newPassword}
              type={"password"}
              label={"New Password"}
              placeholder={"New Password"}
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
          <div className={classes.updateBtn}>
            <Button
              disabled={isApiCall}
              onClick={handleUpdate}
              label={isApiCall ? "Updating...." : "Update"}
            />
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default UpdatePassword;
