import React, { useState } from "react";
import { Container, Row, Col, NavDropdown } from "react-bootstrap";
import styles from "./Header.module.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonIcon from "@mui/icons-material/Person";
import LoginModal from "../LoginModal";
import SignupModal from "../SignupModal";
import { useDispatch, useSelector } from "react-redux";
import { isSignout } from "../../redux/authSlice";
import { BaseUrl } from "../../Config/apiUrl";
import { Get } from "../../AxiosFunction/AxiosFunction";
import { toast } from "react-toastify";
export const Header = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state?.authReducer);
  const dispatch = useDispatch();

  return (
    <div>
      <style jsx>
        {`
          .dropdown-menu {
            border: 1.5px solid #b22335 !important;
            margin-top: 5px;
          }
        `}
      </style>
      <div className={styles.header__main}>
        <Container>
          <Row className={styles.header__main__row}>
            <Col lg={8} md={8} sm={12} className="d-flex align-items-center">
              <div className={styles.header__left__col}>
                <span>
                  <EmailIcon className={styles.icon} /> <strong>Mail:</strong>
                  Hussain@gmail.com
                </span>

                <span>
                  <PhoneIcon className={styles.icon} />{" "}
                  <strong>Contact:</strong>
                  +1-631-830-4427
                </span>
              </div>
            </Col>
            {!user?.isLogin ? (
              <>
                <Col
                  lg={4}
                  md={4}
                  sm={12}
                  className={styles.header_col_right_main}
                >
                  <div className={styles.header__right__col}>
                    <button onClick={() => setShow(true)}>
                      <PersonOutlineIcon className={styles.icon2} /> Login
                    </button>
                    <button onClick={() => setOpen(true)}>
                      <PersonAddAltIcon className={styles.icon2} /> Register
                    </button>
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col
                  lg={4}
                  md={4}
                  sm={12}
                  className={styles.header_col_right_main}
                >
                  <div className={styles.header__right__col}>
                    <NavDropdown
                      className={styles.header__dropdown__main}
                      title="My Account"
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item href="#action/3.1">
                        <NotificationsIcon /> Notifications
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        <ReceiptLongIcon /> My Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        <PersonIcon /> My Profile
                      </NavDropdown.Item>
                    </NavDropdown>
                    <button onClick={handleLogout}>
                      <LogoutIcon className="icon2" /> Logout
                    </button>
                  </div>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </div>
      <LoginModal show={show} setShow={setShow} setOpen={setOpen} />
      <SignupModal show={open} setShow={setOpen} setOpen={setShow} />
    </div>
  );
};
