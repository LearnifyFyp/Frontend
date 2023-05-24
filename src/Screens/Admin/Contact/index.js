import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Delete, Get, Put } from "../../../AxiosFunction/AxiosFunction";
import Button from "../../../Components/Button/Button";
import SidebarSkeleton from "../../../Components/SidebarSkeleton";
import { BaseUrl } from "../../../Config/apiUrl";
import classes from "./Contact.module.css";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import AreYouSureModal from "../../../Components/AreYouSureModal";
import { toast } from "react-toastify";
import NoData from "../../../Components/NoData";
import ViewUsers from "../../../Components/ViewUsers";
import ViewCourse from "../../../Components/ViewCourse";
const Contact = () => {
  const { token, user } = useSelector((state) => state?.authReducer);
  const [users, setUsers] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const getUsers = async () => {
    const apiUrl = BaseUrl(`admin/contacts`);
    setIsLoading(true);
    const response = await Get(apiUrl, token);
    if (response !== undefined) {
      setUsers(response?.data?.contacts);
      setUsersData(response?.data?.user);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async () => {
    const apiUrl = BaseUrl(`admin/contact/${selectedData?._id}`);
    setIsDeleting(true);
    const response = await Delete(apiUrl, token);
    if (response !== undefined) {
      toast.success("Deleted Successfully");
      setDeleteModalOpen(false);
      const tempArr = [...users];
      const findIndex = tempArr?.findIndex(
        (ele) => ele?._id == response?.data?.contact?._id
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
            <h4>All Contacts</h4>
          </div>
          {users?.length == 0 ? (
            <NoData />
          ) : (
            <Table>
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>S.No</th>
                  <th style={{ width: "20%" }}>Name</th>
                  <th style={{ width: "20%" }}>Phone</th>
                  <th style={{ width: "20%" }}>Email</th>
                  <th style={{ width: "20%" }}>Message</th>
                  <th style={{ width: "10%" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {users?.map((item, index) => {
                  console.log(item, "itemitemitem");
                  return (
                    <tr>
                      <td style={{ width: "10%" }}>{++index}</td>
                      <td style={{ width: "20%" }}>{item?.user?.name}</td>
                      <td style={{ width: "20%" }}>{item?.user?.phone}</td>
                      <td style={{ width: "20%" }}>
                        {" "}
                        <span className={classes.elipsis}>
                          {item?.user?.email}
                        </span>
                      </td>
                      <td style={{ width: "20%" }}>
                        {" "}
                        <span className={classes.elipsis}>{item?.message}</span>
                      </td>
                      <td style={{ width: "10%" }}>
                        <div className={classes.roleForAdmin}>
                          <span
                            onClick={() => {
                              setSelectedData(item);
                              setDeleteModalOpen(true);
                            }}
                          >
                            <FaTrash color="#fff" size={20} />
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
      {deleteModalOpen && (
        <AreYouSureModal
          handleClick={handleDelete}
          isDeleting={isDeleting}
          setShow={setDeleteModalOpen}
          show={deleteModalOpen}
        />
      )}
    </>
  );
};

export default Contact;
