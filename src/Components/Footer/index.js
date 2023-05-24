import React, { useEffect, useState } from "react";
import classes from "./Footer.module.css";
import { Logoo, logo } from "../../Constant/ImagePath";
import { Col, Container, Row } from "react-bootstrap";
import { MdEmail, MdLocalPhone, MdLocationOn } from "react-icons/md";
import { footerCity } from "../../Constant/ImagePath";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.pageMain}>
        <div className={classes.footerMain}>
          <Container>
            <Row>
              <Col lg={5} md={12}>
                <div className={classes.colOneMain}>
                  <Link to="/">
                    <div className={classes.sideLogoMain}>
                      <div
                        onClick={() => navigate("/")}
                        className={classes.logoMian}
                      >
                        <img src={Logoo} />
                      </div>
                    </div>
                  </Link>
                  <p>
                    Our platform offers one-on-one tutoring from IBA existing
                    IBA students and alumni who understand your struggles and
                    are willing to help you do better in terms of learnign and
                    Grades. Let's make learning easier together.
                  </p>
                </div>
              </Col>
              <Col lg={2} md={12}>
                <div className={classes.colTwoMain}>
                  <h5>Quick Links</h5>
                  <div className={classes.quickLinks}>
                    <Link to="/about-us">Home</Link>
                    <Link to="/about-us">About Us</Link>
                    <Link to="/contact-us">Find Tutors</Link>
                    <Link to="/contact-us">Contact Us</Link>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={12}>
                <div className={classes.colTwoMain}>
                  <h5>Important Policies</h5>
                  <div className={classes.quickLinks}>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-and-conditions">Terms and conditions</Link>
                    <Link to="/billing-terms-and-conditions">
                      Billing Terms and Conditions
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={2} md={12}>
                <div className={classes.colThreeMain}>
                  <h5>Contact Us</h5>
                  <div className={classes.contactUs}>
                    <a href="mailto:someone@example.com">
                      <p>
                        <MdEmail color="var(--main-color)" size={20} />{" "}
                        support@learnify.com
                      </p>
                    </a>
                    <a href="tel:+4733378901">
                      <p>
                        <MdLocalPhone color="var(--main-color)" size={20} />
                        +923243262208
                      </p>
                    </a>

                    <p>
                      <MdLocationOn color="var(--main-color)" size={20} /> lorem
                      ipsum 555
                    </p>
                  </div>

                  <div className={classes.socialIcons}>
                    <span>
                      <a target="_blank" href="https://facebook.com">
                        <FaFacebookF size={20} />
                      </a>
                    </span>
                    <span>
                      <a target="_blank" href="https://instagram.com">
                        <FiInstagram size={20} />
                      </a>
                    </span>
                    <span>
                      <a target="_blank" href="https://twitter.com">
                        <BsTwitter size={20} />
                      </a>
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className={classes.footerBottom}>
          <p>Copyright © 2022 . All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
