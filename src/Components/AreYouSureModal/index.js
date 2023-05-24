import React from "react";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import classes from "./AreYouSureModal.module.css";
import { TiWarningOutline } from "react-icons/ti";
import Button from "../Button/Button";
const AreYouSureModal = ({
  setShow,
  show,
  handleClick,
  isDeleting,
  text = "Your want to Delete this!",
}) => {
  return (
    <>
      <ModalSkeleton header={"Are You Sure"} show={show} setShow={setShow}>
        <div className={classes.main}>
          <div>
            <TiWarningOutline size={70} />
          </div>
          <p>{text}</p>
          <div className={classes.btnMain}>
            <Button
              disabled={isDeleting}
              onClick={handleClick}
              label={isDeleting ? "Loading..." : "Yes"}
            />
            <Button onClick={() => setShow(false)} label={"No"} />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default AreYouSureModal;
