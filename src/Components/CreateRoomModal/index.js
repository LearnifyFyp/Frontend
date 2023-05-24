import React from "react";
import classes from "./CreateRoomModal.module.css";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import Input from "../Input/Input";
import { useState } from "react";
import { BaseUrl } from "../../Config/apiUrl";
import { Get } from "../../AxiosFunction/AxiosFunction";
import { useEffect } from "react";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Loader from "../Loader";

const RenderComponent = ({ item, selectedUser }) => {
  return (
    <div
      style={selectedUser == item?._id ? { background: "#e9e9e9" } : {}}
      className={classes["student-card"]}
    >
      <img src={item?.avatar?.url} alt="user" />
      <p>{item?.name}</p>
      <small className={classes["email"]}>{item?.email}</small>
      <small className={classes["mobile"]}>{item?.phone}</small>
    </div>
  );
};
const CreateRoomModal = ({
  setShow,
  show,
  isCreatting,
  HandleCreateRoom,
  getChats,
}) => {
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { token, user } = useSelector((state) => state?.authReducer);
  const HandleGetUsers = async () => {
    const apiUrl = BaseUrl(`search/user?search=${searchText}`);
    setisLoading(true);
    const response = await Get(apiUrl, token);
    if (response !== undefined) {
      const userIds2 = new Set(
        getChats?.map(
          (item) => item?.users?.find((ele) => ele?._id !== user?._id)?._id
        )
      );
      console.log(userIds2, "userIds2userIds2userIds2");
      const filteredUsers1 = response?.data?.users?.filter(
        (user) => !userIds2.has(user?._id)
      );
      setUserData(filteredUsers1);
    }
    setisLoading(false);
  };

  useEffect(() => {
    HandleGetUsers();
  }, [searchText]);

  return (
    <>
      <ModalSkeleton
        width={"700px"}
        header={"Create Room"}
        show={show}
        setShow={setShow}
      >
        <div className={classes.modalMian}>
          <Input
            label={"Search User"}
            placeholder={"Search User"}
            setter={setSearchText}
            value={searchText}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <Row className={classes.dataRow}>
              {userData?.map((ele) => {
                return (
                  <Col onClick={() => setSelectedUser(ele?._id)} md={6}>
                    <RenderComponent selectedUser={selectedUser} item={ele} />
                  </Col>
                );
              })}
            </Row>
          )}
          <div className={classes.btnMain}>
            <Button
              onClick={() => HandleCreateRoom(selectedUser)}
              label={isCreatting ? "Loading..." : "Create Room"}
            />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default CreateRoomModal;
