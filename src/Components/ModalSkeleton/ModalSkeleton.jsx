import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classes from "./ModalSkeleton.module.css"
const ModalSkeleton = ({
  show,
  setShow,
  children,
  width,
  borderRadius = "10px",
  header 
}) => {
  return (
    <>
      <style>
        {`
        .modal-dialog{
            max-width:${width && width};
        }
        .modal-content{
            border-radius:${borderRadius};
            overflow:hidden;
        }
        .modal-body{
            padding:0;
        }
        `}
      </style>
      <Modal show={show} onHide={() => setShow(false)} centered>
        
        <Modal.Body>
        <div className={classes.header}>
          <h3>{header}</h3>
        </div>
        <div  className={classes.body}>
          {children}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalSkeleton;
