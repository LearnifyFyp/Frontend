import React, { useRef, useState } from "react";
import classes from "./ProfileWithEditBtn.module.css";
import { HiPencil } from "react-icons/hi";
import { toast } from "react-toastify";
const ProfileWithEditBtn = ({ setAvatar, setAvatarPreview, avatarPreview }) => {
  const ref = useRef();
  const [user, setUser] = useState("");
  const registerDataChange = (e) => {
    const file = e.target.files[0];
    const fileSize = file.size / 1024; // Convert to KB

    if (fileSize > 50) {
      toast.error("Please select an image smaller than 50KB.");
      e.target.value = null; // Clear the input field
      return;
    }

    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  return (
    <>
      <div className={classes.profileWithEditBtn}>
        <div className={classes.imageMain}>
          <img src={avatarPreview} />
        </div>
        <div onClick={() => ref.current.click()} className={classes.pencil}>
          <HiPencil size={20} color={"var(--white-color)"} />
        </div>
      </div>
      <input
        hidden
        ref={ref}
        onChange={registerDataChange}
        name="avatar"
        accept="image/*"
        type={"file"}
      />
    </>
  );
};

export default ProfileWithEditBtn;
