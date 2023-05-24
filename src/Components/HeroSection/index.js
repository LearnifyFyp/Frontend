import React from "react";
import classes from "./HeroSection.module.css";
const HeroSection = ({ heading, para }) => {
  return (
    <div className={classes.heroSectionMain}>
      <div>
        <h1>{heading}</h1>
        <p>{para}</p>
      </div>
    </div>
  );
};

export default HeroSection;
