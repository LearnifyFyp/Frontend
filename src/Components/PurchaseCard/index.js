import React from "react";
import classes from "./PurchaseCard.module.css";
import { teacher } from "../../Constant/ImagePath";
import { AiFillStar } from "react-icons/ai";
const PurchaseCard = ({ item, onRating }) => {
  return (
    <div className={classes.purchaseCard}>
      {item?.isDone && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onRating();
          }}
          className={classes.ratingMain}
        >
          {/* <AiFillStar color="#faca51" size={20} /> */}
          Add Rating
        </div>
      )}
      <div className={classes.imageMian}>
        <img src={item?.lesson?.user?.avatar?.url} />
      </div>
      <div className={classes.nameMain}>
        <h6>{item?.lesson?.user?.name}</h6>
        <h5>
          RS.{item?.lesson?.price} <span>Per hour</span>
        </h5>
      </div>
      <p>{item?.dayTime}</p>
      <p>{item?.lesson?.qualification}</p>
      <p>
        {item?.lesson?.city} , {item?.lesson?.country}
      </p>
      <p>{item?.lesson?.about}</p>
    </div>
  );
};

export default PurchaseCard;
