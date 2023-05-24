import React from "react";
import classes from "./Button.module.css";
const Button = ({ label, className, onClick , disabled , customStyle}) => {
  return (
    <>
      <button
      style={customStyle}
      disabled={disabled}
        onClick={onClick}
        className={[classes.customBtn, className && className].join(" ")}
      >
        {label && label}
      </button>
    </>
  );
};

export default Button;
