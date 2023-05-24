import React from "react";
import { FaSearch } from "react-icons/fa";
import { search } from "../../Constant/ImagePath";
import classes from "./NoData.module.css";
const NoData = ({ text = "No Data Found" }) => {
  return (
    <>
      <div className={classes.noData}>
        <div>
          {/* <FaSearch color="var(--main-color)" size={50} /> */}
          <img src={search} />
          <h5>{text}</h5>
        </div>
      </div>
    </>
  );
};

export default NoData;
