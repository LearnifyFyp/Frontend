import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { BsChatDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import {
  MdKeyboardArrowDown,
  MdOutlineSell,
  MdSpaceDashboard,
} from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logoo, logo } from "../../../Constant/ImagePath";
import Button from "../../Button/Button";
import classes from "./DesktopNavbar.module.css";
// mui
import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import { Get } from "../../../AxiosFunction/AxiosFunction";
import { BaseUrl } from "../../../Config/apiUrl";
import { isSignout } from "../../../redux/authSlice";
import ErrorShowModal from "../../ErrorShowModal";
const DesktopNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [errorShowModa, setErrorShowModa] = useState(false);
  const [errorShowModa2, setErrorShowModa2] = useState(false);
  const isLogin = useSelector((state) => state?.authReducer?.isLogin);
  const userData = useSelector((state) => state?.authReducer?.user);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    const apiUrl = BaseUrl(`logout`);
    const response = await Get(apiUrl);
    if (response !== undefined) {
      dispatch(isSignout());
      toast.success("Logout Successfully");
    }
  };
  const location = useLocation().pathname;

  return (
    <>
      <div className={classes.mainSection}>
        <Container>
          <div className={classes.navBarMain}>
            <div onClick={() => navigate("/")} className={classes.sideLogoMain}>
              <div className={classes.logoMian}>
                <img src={Logoo} />
              </div>
              {/* <h3>
                Let's <span>Learn</span>
              </h3> */}
            </div>
            <ul>
              <li>
                <Link className={location == "/" && classes.activeClass} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={location == "/about-us" && classes.activeClass}
                  to="/about-us"
                >
                  About Us
                </Link>
              </li>
              <li
                style={{ fontFamily: "poppin-regular" }}
                onClick={() => {
                  if (!isLogin) {
                    navigate("/signup");
                  } else if (userData?.role === "student") {
                    setErrorShowModa(true);
                  } else {
                    setErrorShowModa2(true);
                  }
                }}
              >
                Become a tutor
              </li>
              <li>
                <Link
                  className={
                    location == `${"/find-tutors"}/${"bba"}` &&
                    classes.activeClass
                  }
                  to={`${"/find-tutors"}/${"991"}`}
                >
                  Find Tutors
                </Link>
              </li>

              <li>
                <Link
                  className={location == "/contact-us" && classes.activeClass}
                  to="/contact-us"
                >
                  Contact Us
                </Link>
              </li>
              {!isLogin ? (
                <>
                  <Button
                    onClick={() => navigate("/login")}
                    className={classes.productBtn}
                    label={"Login"}
                  />
                  <Button
                    onClick={() => navigate("/signup")}
                    className={classes.productBtn}
                    label={"Signup"}
                  />
                </>
              ) : (
                <>
                  {/* mui */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{
                          ml: 2,
                          width: 40,
                          height: 40,
                          background: "var(--main-color)",
                        }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            background: "var(--main-color)",
                          }}
                        >
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "top center",
                            }}
                            src={userData?.avatar?.url}
                          />
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    {!open && (
                      <div className={classes.downArrow}>
                        <MdKeyboardArrowDown
                          color="var(--main-color)"
                          size={30}
                        />
                      </div>
                    )}
                  </Box>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    {userData?.roleForAdmin == "admin" && (
                      <MenuItem
                        onClick={() => {
                          navigate("/users");
                          handleClose();
                        }}
                      >
                        <Avatar style={{ background: "var(--main-color)" }}>
                          <RiAdminLine color="var(--white-color)" size={20} />
                        </Avatar>
                        Admin Panel
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => {
                        navigate(
                          userData?.role == "tutor"
                            ? "/tutor-dashboard"
                            : "/student-dashboard"
                        );
                        handleClose();
                      }}
                    >
                      <Avatar style={{ background: "var(--main-color)" }}>
                        <MdSpaceDashboard
                          color="var(--white-color)"
                          size={20}
                        />
                      </Avatar>
                      {userData?.role == "tutor"
                        ? "Dashboard"
                        : "Past Sessions"}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/update-profile");
                        handleClose();
                      }}
                    >
                      <Avatar style={{ background: "var(--main-color)" }}>
                        <CgProfile color="var(--white-color)" size={20} />
                      </Avatar>
                      My Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/chat");
                        handleClose();
                      }}
                    >
                      <Avatar style={{ background: "var(--main-color)" }}>
                        <BsChatDots color="var(--white-color)" size={20} />
                      </Avatar>
                      Chat
                    </MenuItem>
                    {userData?.role == "tutor" && (
                      <MenuItem
                        onClick={() => {
                          navigate("/sell-courses");
                          handleClose();
                        }}
                      >
                        <Avatar style={{ background: "var(--main-color)" }}>
                          <MdOutlineSell color="var(--white-color)" size={20} />
                        </Avatar>
                        My Sold Lesson
                      </MenuItem>
                    )}

                    <MenuItem
                      onClick={() => {
                        navigate("/update-password");
                        handleClose();
                      }}
                    >
                      <Avatar style={{ background: "var(--main-color)" }}>
                        <RxUpdate color="var(--white-color)" size={20} />
                      </Avatar>
                      Update Password
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        handleLogout();
                        handleClose();
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </ul>
          </div>
        </Container>
      </div>
      {errorShowModa && (
        <ErrorShowModal
          heading={"You're Logged in as a Student"}
          text={"Register as a tutor to become a tutor"}
          setShow={setErrorShowModa}
          show={errorShowModa}
        />
      )}
      {errorShowModa2 && (
        <ErrorShowModal
          heading={"You're also Logged in as a tutor"}
          // text={"Register as a tutor to become a tutor"}
          setShow={setErrorShowModa2}
          show={errorShowModa2}
        />
      )}
    </>
  );
};

export default DesktopNavbar;
