import React from "react";
import classes from "./TeamCard.module.css";
import Button from "../Button/Button";
const TeamCard = ({ item, onClick }) => {
  const { classOf, name, qualification, description, img } = item;
  return (
    <div className={classes.teamCard}>
      <div className={classes.imagemMain}>
        <img src={img} alt="team member" />
      </div>
      <div className={classes.basic}>
        <h6>{name}</h6>
        <p>{classOf}</p>
        <p>{qualification}</p>
        <p className={classes.description}>{description}</p>
      </div>
      <div className={classes.btnMain}>
        <Button onClick={onClick} label={"View more"} />
      </div>
    </div>
  );
};

export default TeamCard;
