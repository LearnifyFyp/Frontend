import React, { useState } from "react";
import classes from "./UpdateProfile.module.css";
import NavBar from "../../Components/NavBar";
import ProfileWithEditBtn from "../../Components/ProfileWithEditBtn";
import Input from "../../Components/Input/Input";
import { Col, Row } from "react-bootstrap";
import Button from "../../Components/Button/Button";
import { BaseUrl, validateEmail } from "../../Config/apiUrl";
import { toast } from "react-toastify";
import { Delete, Put } from "../../AxiosFunction/AxiosFunction";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../../Components/HeroSection";
import Footer from "../../Components/Footer";
import DropDown from "../../Components/DropDown";
import { isSignout, updateUser } from "../../redux/authSlice";
import AreYouSureModal from "../../Components/AreYouSureModal";
import PhoneInput from "react-phone-input-2";
const UpdateProfile = () => {
  const { token, user } = useSelector((state) => state?.authReducer);
  const dispatch = useDispatch();
  const nameSplit = user?.name?.split(" ");
  const [firstName, setFirstName] = useState(nameSplit[0] || "");
  const [lastName, setLastName] = useState(nameSplit[1] || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [role, setRole] = useState(
    { label: user?.role, value: user?.role } || ""
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || null);
  const handleUpdate = async () => {
    const apiUrl = BaseUrl(`me/update`);
    const body = {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      role: role?.value,
      avatar,
    };
    const myForm = new FormData();
    myForm.append("name", body?.name);
    myForm.append("email", body?.email);
    myForm.append("phone", body?.phone);
    myForm.append("role", body?.role);
    {
      avatar !== null && myForm.append("avatar", body?.avatar);
    }
    for (let key in body) {
      if (body[key] === "") {
        return toast.error("Please fill all the fields");
      }
    }
    if (!validateEmail(body?.email)) {
      return toast.error("Please Fill Valid Email");
    }
    setIsApiCall(true);
    const response = await Put(apiUrl, myForm, token);
    if (response !== undefined) {
      dispatch(updateUser(response?.data));
      toast.success("Profile Update Successfully");
    }
    setIsApiCall(false);
  };

  const handleDelete = async () => {
    const apiUrl = BaseUrl("me/delete");
    setIsDeleting(true);
    const response = await Delete(apiUrl, token);
    if (response !== undefined) {
      toast.success("Your Account has been Deleted");
      setModalOpen(false);
      dispatch(isSignout());
    }
    setIsDeleting(false);
  };

  const option = [
    {
      label: "Student",
      value: "student",
    },
    {
      label: "Tutor",
      value: "tutor",
    },
  ];
  return (
    <>
      <style>
        {`
      .react-tel-input .form-control{
        width:100% !important;
        height:48px !important;
        background: var(--white-color) !important;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important;
        border:none !important;
      }
      .react-tel-input .flag-dropdown{
          border:none !important;
          background-color: #ebebeb !important;
      }
      `}
      </style>
      <NavBar />
      <HeroSection
        heading={"Update Profile"}
        para={
          "In publ commonly used to demonstrate the visual form of a document or a typeface without relying"
        }
      />
      <div className={classes.UpdateProfileMain}>
        <Row className="gy-5">
          <Col md={6}>
            <ProfileWithEditBtn
              setAvatar={setAvatar}
              setAvatarPreview={setAvatarPreview}
              avatarPreview={avatarPreview}
            />
          </Col>
          <Col md={6}>
            <div className={classes.dltBtnMain}>
              <Button
                onClick={() => setModalOpen(true)}
                label={"Delete My Account"}
              />
            </div>
          </Col>
          <Col md={6}>
            <Input
              setter={setFirstName}
              value={firstName}
              label={"First Name"}
              placeholder={"First Name"}
            />
          </Col>
          <Col md={6}>
            <Input
              setter={setLastName}
              value={lastName}
              label={"Last Name"}
              placeholder={"Last Name"}
            />
          </Col>
          <Col md={6}>
            <div className={classes.phoneInputMain}>
              <label>Phone</label>
              <PhoneInput
                placeholder={"Phone"}
                value={String(phone)}
                onChange={(phone) => setPhone(String(phone))}
              />
            </div>
          </Col>
          <Col md={6}>
            <DropDown
              setter={setRole}
              value={role}
              label={"Role"}
              option={option}
            />
          </Col>
          <Col md={12}>
            <Input
              setter={setEmail}
              value={email}
              label={"Email"}
              placeholder={"Email"}
            />
          </Col>
          <Col md={12}>
            <div className={classes.updateBtn}>
              <Button
                disabled={isApiCall}
                onClick={handleUpdate}
                label={isApiCall ? "Updating..." : "Update"}
              />
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
      {modalOpen && (
        <AreYouSureModal
          isDeleting={isDeleting}
          setShow={setModalOpen}
          show={modalOpen}
          handleClick={handleDelete}
        />
      )}
    </>
  );
};

export default UpdateProfile;
