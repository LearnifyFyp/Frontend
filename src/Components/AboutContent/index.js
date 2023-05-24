import React from "react";
import classes from "./AboutContent.module.css";
import { about } from "../../Constant/ImagePath";
import { Col, Row } from "react-bootstrap";
const AboutContent = ({ index, img, content, heading }) => {
  return (
    <div className={classes.aboutContent}>
      <Row
        style={
          index % 2 == 1
            ? { flexDirection: "row-reverse" }
            : { flexDirection: "row" }
        }
        className="align-items-center"
      >
        <Col lg={6} md={12}>
          <div className={classes.imagemMain}>
            <img src={img} alt="about-us" />
          </div>
        </Col>
        <Col lg={6} md={12}>
          <div className={classes.contentMain}>
            <h3>{heading}</h3>
            <p>{content}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AboutContent;
