import React from "react";
import classes from "./AddItem.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
const AddItem = ({ setter, value, label }) => {
  const [textVal, setTextVal] = useState("");
  const handleAdd = () => {
    if (textVal == "") {
      toast.error("Please Add Field");
      return;
    }
    setter((prev) => [textVal, ...prev]);
    setTextVal("");
  };
  console.log(value, "valuevalue");
  return (
    <div className={classes.main}>
      <label>{label}</label>
      <div className={classes.header}>
        <div>
          <Input setter={setTextVal} value={textVal} placeholder={label} />
        </div>
        <div>
          <Button onClick={handleAdd} label={label} />
        </div>
      </div>
      <div className={classes.renderMain}>
        {value?.map((ele, index) => {
          return (
            <div key={index} className={classes.render}>
              <span
                onClick={() => {
                  setter(value?.filter((item, ind) => ind !== index));
                }}
              >
                <RxCross2 color="#d61111" size={18} />
              </span>
              <p>{ele}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddItem;
