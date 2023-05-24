import React from "react";
import classes from "./MemberDetailModal.module.css";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
const MemberDetailModal = ({ show, setShow, selectedItem }) => {
  console.log(selectedItem, "selectedItemselectedItem");
  return (
    <>
      <ModalSkeleton header={"Member Details"} setShow={setShow} show={show}>
        <div className={classes.main}>
          <div className={classes.imageMain}>
            <img src={selectedItem?.img} />
          </div>
          <h5>{selectedItem?.name}</h5>
          <p>{selectedItem?.classOf}</p>
          <p>{selectedItem?.qualification}</p>
          <p>{selectedItem?.description}</p>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default MemberDetailModal;
