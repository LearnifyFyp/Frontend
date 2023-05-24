import React from "react";
import { Col, Row } from "react-bootstrap";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import classes from "./ViewCourse.module.css";
import { BiCertification } from "react-icons/bi";
const ViewCourse = ({ show, setShow, selectedData }) => {
  return (
    <ModalSkeleton
      header={"Course Detail"}
      width={"600px"}
      setShow={setShow}
      show={show}
    >
      <div className={classes.viewUsers}>
        <div className={classes.imageMain}>
          <img src={selectedData?.user?.avatar?.url} />
        </div>
        <Row className="text-center gy-3">
          <Col md={6}>
            <div className={classes.detail}>
              <label> Name</label>
              <p>{selectedData?.user?.name}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className={classes.detail}>
              <label>Email</label>
              <p>{selectedData?.user?.email}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className={classes.detail}>
              <label>Price</label>
              <p>{selectedData?.price}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className={classes.detail}>
              <label>City</label>
              <p>{selectedData?.city}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className={classes.detail}>
              <label>Country</label>
              <p>{selectedData?.country}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className={classes.detail}>
              <label>Qualification</label>
              <p>{selectedData?.qualification}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className={classes.detail}>
              <label>Experiance</label>
              <p>{selectedData?.experiance}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className={classes.detail}>
              <label>Number Of Reviews</label>
              <p>{selectedData?.numOfReviews}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className={classes.detail}>
              <label>Start Date</label>
              <p>{selectedData?.startDate}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className={classes.detail}>
              <label>End Date</label>
              <p>{selectedData?.endDate}</p>
            </div>
          </Col>
          <Col md={12}>
            <div className={classes.detail}>
              <label>Certification</label>
              {selectedData?.certification?.map((ele, index) => {
                return (
                  <div key={index} className={classes.certi}>
                    <p>
                      <BiCertification color="var(--main-color)" size={16} />{" "}
                      {ele}
                    </p>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col md={12}>
            <div className={classes.detail}>
              <label>About</label>
              <p>{selectedData?.about}</p>
            </div>
          </Col>
        </Row>
      </div>
    </ModalSkeleton>
  );
};

export default ViewCourse;
