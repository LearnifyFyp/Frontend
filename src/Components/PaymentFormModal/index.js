import React from "react";
import classes from "./PaymentFormModal.module.css";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import Input from "../Input/Input";
import { Col, Row } from "react-bootstrap";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { useState } from "react";
const PaymentFormModal = ({
  show,
  setShow,
  location,
  handlePayment,
  isLoading,
  selectedTimeObj,
}) => {
  const { user } = useSelector((state) => state?.authReducer);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvcNumber, setCvcNumber] = useState("");
  const params = {
    cardNumber: Number(cardNumber),
    expireDate: Number(expiryDate),
    cvcNumber: Number(cvcNumber),
    amount: location?.price,
    dayTime: selectedTimeObj?.day + " ," + selectedTimeObj?.time,
  };
  return (
    <>
      <ModalSkeleton
        width={"700px"}
        header={"Payment Form"}
        show={show}
        setShow={setShow}
      >
        <div className={classes.pageMain}>
          <Row className="gy-3">
            <Col md={12}>
              <Input value={user?.name} label={"Name"} placeholder={"Name"} />
            </Col>
            <Col md={12}>
              <Input
                value={user?.email}
                label={"Email"}
                placeholder={"Email"}
              />
            </Col>
            <Col md={12}>
              <Input
                value={location?.price}
                label={"Price"}
                placeholder={"Price"}
              />
            </Col>
            <Col md={12}>
              <Input
                setter={setCardNumber}
                value={cardNumber}
                label={"Card Number"}
                placeholder={"Enter 16 digit card number"}
                // type={"number"}
              />
            </Col>
            <Col md={12}>
              <Input
                setter={setExpiryDate}
                value={expiryDate}
                label={"Expriry Date"}
                placeholder={"2023"}
                type={"number"}
              />
            </Col>
            <Col md={12}>
              <Input
                setter={setCvcNumber}
                value={cvcNumber}
                label={"CVC Number"}
                placeholder={"300"}
                type={"number"}
              />
            </Col>
            <Col md={12}>
              <div className={classes.btn}>
                <Button
                  disabled={isLoading}
                  onClick={() => handlePayment(params)}
                  label={isLoading ? "Submitting..." : "Submit"}
                />
              </div>
            </Col>
          </Row>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default PaymentFormModal;
