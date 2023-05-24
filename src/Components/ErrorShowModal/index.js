import React from "react";
import classes from "./ErrorShowModal.module.css";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import Button from "../Button/Button";
const ErrorShowModal = ({ show, setShow, heading, text, headerHead }) => {
  return (
    <>
      <ModalSkeleton
        header={headerHead ? headerHead : "Warning"}
        show={show}
        setShow={setShow}
      >
        <div className={classes.maim}>
          <h4>{heading}</h4>
          <p>{text}</p>
          <Button onClick={() => setShow(false)} label={"Got it"} />
        </div>
      </ModalSkeleton>
    </>
  );
};

export default ErrorShowModal;
