import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logo } from "../../Constant/ImagePath";
import classes from "./SidebarSkeleton.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
const RenderComponent = ({ text, icon, path }) => {
  const navigate = useNavigate();
  const location = useLocation()?.pathname;

  return (
    <div
      onClick={() => navigate(path)}
      className={location == path ? classes.activeMenu : classes.menuMain}
    >
      <div>{icon}</div>
      <p>{text}</p>
    </div>
  );
};
const SidebarSkeleton = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.authReducer);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <>
      <div className={classes.pageMain}>
        <div
          style={windowSize < 991 && toggle ? { marginLeft: "0" } : {}}
          className={classes.leftMain}
        >
          <div className={classes.header}>
            <div onClick={() => navigate("/")} className={classes.sideLogoMain}>
              <div className={classes.logoMian}>
                <img src={logo} />
              </div>
              <h3>
                Let's <span>Learn</span>
              </h3>
            </div>
          </div>
          <RenderComponent
            path={"/users"}
            text={"All Users"}
            icon={<MdSpaceDashboard color="var(--main-color)" size={30} />}
          />
          <RenderComponent
            path={"/course"}
            text={"Lesson"}
            icon={<MdSpaceDashboard color="var(--main-color)" size={30} />}
          />
          <RenderComponent
            path={"/sold-course"}
            text={"Sold Lesson"}
            icon={<MdSpaceDashboard color="var(--main-color)" size={30} />}
          />
          <RenderComponent
            path={"/contact"}
            text={"Contact"}
            icon={<MdSpaceDashboard color="var(--main-color)" size={30} />}
          />
        </div>
        <div className={classes.rightMain}>
          <div
            style={
              toggle
                ? { background: "rgb(0 0 0 / 30%)" }
                : { background: "unset", width: "0px", height: "0" }
            }
            className={classes.overFlow}
          ></div>
          <div className={`${[classes.header, classes.rightHeader].join(" ")}`}>
            <div
              style={toggle ? { marginLeft: "260px" } : { marginLeft: "10px" }}
              onClick={() => setToggle(!toggle)}
              className={classes.menuBar}
            >
              <AiOutlineMenu size={20} />
            </div>
            <div>
              <h3>{user?.name}</h3>
              <img src={user?.avatar?.url} />
            </div>
          </div>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default SidebarSkeleton;
