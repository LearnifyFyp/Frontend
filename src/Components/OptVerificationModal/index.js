import React, { useState } from "react";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import classes from "./OptVerificationModal.module.css";
import OtpInput from "react-otp-input";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Col, Row } from "react-bootstrap";
const OptVerificationModal = ({
  show,
  setShow,
  isVerify,
  handleOtpVerification,
}) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const params = {
    otp: Number(otp),
    newPassword,
    confirmPassword,
  };
  return (
    <>
      <ModalSkeleton header={"OTP Verification"} setShow={setShow} show={show}>
        <div className={classes.main}>
          <p>Check your gmail to get your OTP code.</p>
          <Row className="gy-3">
            <Col md={12}>
              <div className={classes.otpMain}>
                <OtpInput
                  shouldAutoFocus={true}
                  isInputNum={true}
                  value={otp}
                  onChange={(e) => setOtp(e)}
                  numInputs={6}
                />
              </div>
              <p>Your OTP code is expired in 2 minutes</p>
            </Col>
            <Col md={12}>
              <Input
                type={"password"}
                setter={setNewPassword}
                value={newPassword}
                label={"New Password"}
                placeholder={"New Password"}
              />
            </Col>
            <Col md={12}>
              <Input
                type={"password"}
                setter={setConfirmPassword}
                value={confirmPassword}
                label={"Confirm Password"}
                placeholder={"Confirm Password"}
              />
            </Col>
            <Col md={12}>
              <Button
                onClick={() => handleOtpVerification(params)}
                customStyle={{ width: "100%" }}
                label={isVerify ? "Verifying..." : "Verify"}
                disabled={isVerify}
              />
            </Col>
          </Row>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default OptVerificationModal;
