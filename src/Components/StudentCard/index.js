import classes from "./StudentCard.module.css";
import { user } from "../../Constant/ImagePath";
import { FcCheckmark } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";
const StudentCard = ({ item, onClick, dayTime }) => {
  console.log(dayTime, "dayTimedayTime");
  return (
    <div className={classes["student-card"]}>
      <div onClick={onClick} className={classes.markDone}>
        {dayTime?.isDone ? (
          <FaCheckCircle color="green" size={26} />
        ) : (
          <FcCheckmark color="#fff" size={18} />
        )}
      </div>
      <img src={item?.avatar?.url} alt="user" />
      <p>{item?.name}</p>
      <small className={classes["email"]}>{item?.email}</small>
      <small className={classes["mobile"]}>{item?.phone}</small>
      <small className={classes["mobile"]}>{dayTime?.dayTime}</small>
    </div>
  );
};

export default StudentCard;
