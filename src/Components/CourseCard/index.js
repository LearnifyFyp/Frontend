import React, { useState } from "react";
import classes from "./CourseCard.module.css";
import StarRatings from "react-star-ratings";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import Button from "../Button/Button";
import { teacher } from "../../Constant/ImagePath";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CourseCard = ({ item, onClick, onEdit }) => {
  const { user } = useSelector((state) => state?.authReducer);
  const navigate = useNavigate();
  return (
    <>
      <div onClick={onClick} className={classes.main}>
        {onEdit && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className={classes.editMain}
          >
            <FaEdit color="var(--white-color)" size={18} />
          </div>
        )}
        <div className={classes["description-wrapper"]}>
          <div>
            <div className={classes.headerMain}>
              <div className={classes.header}>
                <div className={classes.imageMain}>
                  <img src={item?.user?.avatar?.url} />
                </div>
                <div>
                  <h5>{item?.user?.name}</h5>
                  <p>{item?.qualification}</p>
                  <p>{item?.experiance}</p>
                </div>
              </div>
              <div></div>
            </div>
            <div className={classes.aboutMain}>
              <p>{item?.about}</p>
            </div>
          </div>

          <div className={classes["right-divider"]}>
            <div className={classes.dateMain}>
              <h6>
                Rs.{item?.price}{" "}
                <span style={{ color: "var(--main-color)" }}> Per hour </span>
              </h6>
              {/* dsdddd */}
              <div className={classes.ratingMain}>
                <StarRatings
                  rating={item?.ratings}
                  starRatedColor="#FFD600"
                  numberOfStars={5}
                  name="rating"
                  starSpacing={"3px"}
                />
                <p className={classes.reviews}>
                  <span>Reviews</span>{" "}
                  {item?.numOfReviews ? item?.numOfReviews : "0"}
                </p>
              </div>
            </div>
            <div className={classes.btnMain}>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (user?._id == item?.user?._id) {
                    return;
                  }
                  navigate(`/chat`, { state: item });
                }}
                label={"Message"}
              />
              <Button label={"Book a Lesson"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
