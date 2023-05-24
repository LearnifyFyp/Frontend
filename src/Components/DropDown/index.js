import React from "react";
import classes from "./DropDown.module.css";
import Select from "react-select";

const DropDown = ({
  option,
  label,
  placeholder,
  setter,
  value,
  isMulti = false,
}) => {
  return (
    <>
      <style>
        {`
        .select__control{
                border:none;
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                padding: 6px 0px 6px 5px;
        }
        .select__indicator-separator{
                display:none;
        }
        .select__menu{
            background:;
        }
        `}
      </style>

      <div className={classes.dropDownMain}>
        <label>{label}</label>
        <Select
          isMulti={isMulti}
          onChange={setter}
          value={value}
          className="basic-single"
          classNamePrefix="select"
          // defaultValue={option[0]}
          name="color"
          options={option}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default DropDown;
