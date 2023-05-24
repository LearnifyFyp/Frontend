import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Delete, Get, Put } from "../../../AxiosFunction/AxiosFunction";
import Button from "../../../Components/Button/Button";
import SidebarSkeleton from "../../../Components/SidebarSkeleton";
import { BaseUrl } from "../../../Config/apiUrl";
import classes from "./SoldLesson.module.css";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import AreYouSureModal from "../../../Components/AreYouSureModal";
import { toast } from "react-toastify";
import NoData from "../../../Components/NoData";
import ViewUsers from "../../../Components/ViewUsers";
import ViewCourse from "../../../Components/ViewCourse";
const SoldLesson = () => {
  const { token, user } = useSelector((state) => state?.authReducer);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const getUsers = async () => {
    const apiUrl = BaseUrl(`admin/sold/Lessons`);
    setIsLoading(true);
    const response = await Get(apiUrl, token);
    if (response !== undefined) {
      setUsers(response?.data?.lessons);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);

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
                  <th style={{ width: "10%" }}>S.No</th>
                  <th style={{ width: "20%" }}>Name</th>
                  <th style={{ width: "15%" }}>Email</th>
                  <th style={{ width: "15%" }}>Price</th>
                  <th style={{ width: "15%" }}>City</th>
                  <th style={{ width: "15%" }}>Country</th>
                  <th style={{ width: "10%" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {users?.map((item, index) => {
                  console.log(item, "itemitemitem");
                  return (
                    <tr>
                      <td style={{ width: "10%" }}>{++index}</td>
                      <td style={{ width: "20%" }}>
                        <span className={classes.elipsis}>
                          {item?.user?.name}
                        </span>
                      </td>
                      <td style={{ width: "15%" }}>
                        <span className={classes.elipsis}>
                          {item?.user?.email}
                        </span>
                      </td>
                      <td style={{ width: "15%" }}>{item?.price}</td>
                      <td style={{ width: "15%" }}>{item?.city}</td>
                      <td style={{ width: "15%" }}>{item?.country}</td>
                      <td style={{ width: "10%" }}>
                        <div className={classes.roleForAdmin}>
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
      {viewModalOpen && (
        <ViewCourse
          selectedData={selectedData}
          setShow={setViewModalOpen}
          show={viewModalOpen}
        />
      )}
    </>
  );
};

export default SoldLesson;
