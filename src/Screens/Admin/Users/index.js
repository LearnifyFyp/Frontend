import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Delete, Get, Put } from "../../../AxiosFunction/AxiosFunction";
import Button from "../../../Components/Button/Button";
import SidebarSkeleton from "../../../Components/SidebarSkeleton";
import { BaseUrl } from "../../../Config/apiUrl";
import classes from "./Users.module.css";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import AreYouSureModal from "../../../Components/AreYouSureModal";
import { toast } from "react-toastify";
import NoData from "../../../Components/NoData";
import ViewUsers from "../../../Components/ViewUsers";
const Users = () => {
  const { token, user } = useSelector((state) => state?.authReducer);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const getUsers = async () => {
    const apiUrl = BaseUrl(`admin/users`);
    setIsLoading(true);
    const response = await Get(apiUrl, token);
    if (response !== undefined) {
      setUsers(response?.data?.users);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleChangeRole = async () => {
    const apiUrl = BaseUrl(`admin/user/${selectedData?._id}`);
    const body = {
      name: selectedData?.name,
      email: selectedData?.email,
      roleForAdmin: "admin",
    };
    setIsUpdating(true);
    const response = await Put(apiUrl, body, token);
    if (response !== undefined) {
      toast.success("Role Changed Successfully");
      setUpdateModalOpen(false);
    }
    setIsUpdating(false);
  };
  const handleDelete = async () => {
    const apiUrl = BaseUrl(`admin/user/${selectedData?._id}`);
    setIsDeleting(true);
    const response = await Delete(apiUrl, token);
    if (response !== undefined) {
      toast.success("Deleted Successfully");
      setDeleteModalOpen(false);
      const tempArr = [...users];
      const findIndex = tempArr?.findIndex(
        (ele) => ele?._id == response?.data?.users?._id
      );
      tempArr?.splice(findIndex, 1);
      setUsers(tempArr);
    }
    setIsDeleting(false);
  };
  return (
    <>
      <SidebarSkeleton>
        <div className={classes.pageMain}>
          <div className={classes.header}>
            <h4>All Users</h4>
          </div>
          {users?.length == 0 ? (
            <NoData />
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users?.map((item, index) => {
                  console.log(item, "itemitemitem");
                  return (
                    <tr>
                      <td style={{ width: "10%" }}>{++index}</td>
                      <td style={{ width: "20%" }}>
                        <span className={classes.elipsis}>{item?.name}</span>
                      </td>
                      <td style={{ width: "20%" }}>
                        <span className={classes.elipsis}>{item?.email}</span>
                      </td>
                      <td style={{ width: "20%" }}>{item?.phone}</td>
                      <td style={{ width: "10%" }}>{item?.roleForAdmin}</td>
                      <td style={{ width: "20%" }}>
                        <div className={classes.roleForAdmin}>
                          {item?.roleForAdmin !== "admin" && (
                            <span
                              onClick={() => {
                                setSelectedData(item);
                                setUpdateModalOpen(true);
                              }}
                            >
                              <BiEdit color="#fff" size={20} />
                            </span>
                          )}
                          <span
                            onClick={() => {
                              setSelectedData(item);
                              setDeleteModalOpen(true);
                            }}
                          >
                            <FaTrash color="#fff" size={20} />
                          </span>
                          <span
                            onClick={() => {
                              setSelectedData(item);
                              setViewModalOpen(true);
                            }}
                          >
                            <AiFillEye color="#fff" size={20} />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>
      </SidebarSkeleton>
      {updateModalOpen && (
        <AreYouSureModal
          text="You Want to change this role user to admin?"
          handleClick={handleChangeRole}
          isDeleting={isUpdating}
          setShow={setUpdateModalOpen}
          show={updateModalOpen}
        />
      )}
      {deleteModalOpen && (
        <AreYouSureModal
          handleClick={handleDelete}
          isDeleting={isDeleting}
          setShow={setDeleteModalOpen}
          show={deleteModalOpen}
        />
      )}
      {viewModalOpen && (
        <ViewUsers
          selectedData={selectedData}
          setShow={setViewModalOpen}
          show={viewModalOpen}
        />
      )}
    </>
  );
};

export default Users;
