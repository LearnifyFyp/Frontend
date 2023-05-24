import React from "react";
import classes from "./Loader.module.css";
import Spinner from "react-bootstrap/Spinner";
const Loader = () => {
  return (
    <>
      <div className={classes.main}>
        <div>
          <Spinner style={{ color: "var(--main-color)" }} animation="grow" />
          <Spinner style={{ color: "var(--main-color)" }} animation="grow" />
          <Spinner style={{ color: "var(--main-color)" }} animation="grow" />
        </div>
      </div>
    </>
  );
};

export default Loader;
