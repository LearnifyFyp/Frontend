import React from "react";
import classes from "./ReviewsCard.module.css";
import { teacher } from "../../Constant/ImagePath";
import StarRatings from "react-star-ratings";
const ReviewsCard = ({ data }) => {
  return (
    <div className={classes.reviewsCard}>
      <div className={classes.header}>
        <div className={classes.imageMain}>
          <img src={data?.avatar} />
        </div>
        <div className={classes.rightMian}>
          <h5>{data?.name}</h5>
          <div className={classes.ratingMain}>
            <StarRatings
              rating={data?.rating}
              starRatedColor="#FFD600"
              numberOfStars={5}
              name="rating"
              starSpacing={"3px"}
            />
          </div>
        </div>
      </div>
      <div className={classes.commentDiv}>
        <p>{data?.comment}</p>
      </div>
    </div>
  );
};

export default ReviewsCard;
