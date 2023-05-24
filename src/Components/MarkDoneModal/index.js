import React from "react";
import classes from "./MarkDoneModal.module.css";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import Button from "../Button/Button";
const MarkDoneModal = ({ show, setShow, isMarkDone, handleMarkDone }) => {
  return (
    <>
      <ModalSkeleton header={"Mark Done"} setShow={setShow} show={show}>
        <div className={classes.main}>
          <p>If Your course has completed then mark done</p>
          <Button
            disabled={isMarkDone}
            onClick={handleMarkDone}
            label={isMarkDone ? "Loading..." : "Mark Done"}
          />
        </div>
      </ModalSkeleton>
    </>
  );
};

export default MarkDoneModal;
