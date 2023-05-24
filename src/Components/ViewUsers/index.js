import React from "react";
import { Col, Row } from "react-bootstrap";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import classes from "./ViewUsers.module.css";
const ViewUsers = ({ show, setShow, selectedData }) => {
  console.log(selectedData, "selectedDataselectedData");
  return (
    <ModalSkeleton
      header={"User Detail"}
      width={"600px"}
      setShow={setShow}
      show={show}
    >
      <div className={classes.viewUsers}>
        <div className={classes.imageMain}>
          <img src={selectedData?.avatar?.url} />
        </div>
        <Row className="text-center gy-3">
          <Col md={6}>
            <div className={classes.detail}>
              <label>Name</label>
              <p>{selectedData?.name}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className={classes.detail}>
              <label>Email</label>
              <p>{selectedData?.email}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className={classes.detail}>
              <label>Phone</label>
              <p>{selectedData?.phone}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className={classes.detail}>
              <label>Role</label>
              <p>{selectedData?.roleForAdmin}</p>
            </div>
          </Col>
        </Row>
      </div>
    </ModalSkeleton>
  );
};

export default ViewUsers;
