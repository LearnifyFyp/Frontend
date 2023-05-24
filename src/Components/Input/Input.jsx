import React from "react";
import classes from "./Input.module.css";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
const Input = ({
  setter,
  value,
  label,
  type,
  placeholder,
  leftIcon,
  className,
  disabled = false,
}) => {
  const [open, setOpen] = useState("close");
  return (
    <div className={[classes.inputContainer, className].join(" ")}>
      <label>{label && label}</label>
      <div className={classes.inputMainWithIcon}>
        {type == "password" &&
          (open == "close" ? (
            <AiFillEyeInvisible
              onClick={() => setOpen("open")}
              className={classes.eyeicon}
            />
          ) : (
            <AiFillEye
              onClick={() => setOpen("close")}
              className={classes.eyeicon}
            />
          ))}
        <input
          disabled={disabled}
          onChange={(e) => setter(e.target.value)}
          value={value}
          style={leftIcon ? { paddingLeft: "35px" } : { paddingLeft: "10px" }}
          type={
            type === "password"
              ? open == "close"
                ? "password"
                : "text"
              : type == "number"
              ? "number"
              : "text"
          }
          placeholder={placeholder && placeholder}
        />
        {/* {leftIcon && <img src={leftIcon} />} */}
        <div className={classes.leftIconMain}>{leftIcon}</div>
      </div>
    </div>
  );
};

export default Input;
