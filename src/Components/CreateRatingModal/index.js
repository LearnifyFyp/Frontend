import React, { useState } from "react";
import classes from "./CreateRatingModal.module.css";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import StarRatings from "react-star-ratings";
import { Col, Row } from "react-bootstrap";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
const CreateRatingModal = ({
  show,
  setShow,
  selectedData,
  handleRating,
  isRating,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const params = {
    comment,
    rating,
    lessonId: selectedData?.lesson?._id,
  };
  return (
    <>
      <ModalSkeleton
        width={"620px"}
        header={"Your Reviews"}
        show={show}
        setShow={setShow}
      >
        <div className={classes.ratingMain}>
          <StarRatings
            rating={rating}
            changeRating={setRating}
            starRatedColor="#FFD600"
            numberOfStars={5}
            name="rating"
            starSpacing={"3px"}
          />
        </div>
        <Row>
          <Col md={12}>
            <TextArea
              setter={setComment}
              value={comment}
              label={"Comment"}
              placeholder={"Comment"}
            />
          </Col>
          <Col md={12}>
            <div className={classes.btnMain}>
              <Button
                disabled={isRating}
                onClick={() => handleRating(params)}
                label={isRating ? "Submitting..." : "Submit"}
              />
            </div>
          </Col>
        </Row>
      </ModalSkeleton>
    </>
  );
};

export default CreateRatingModal;
