import React from "react";
import classes from "./SellCourses.module.css";
import HeroSection from "../../Components/HeroSection";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import CourseCard from "../../Components/CourseCard";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { BaseUrl } from "../../Config/apiUrl";
import { Get, Put } from "../../AxiosFunction/AxiosFunction";
import { useEffect } from "react";
import NoData from "../../Components/NoData";
import MarkDoneModal from "../../Components/MarkDoneModal";
import { toast } from "react-toastify";
import StudentCard from "../../Components/StudentCard";
const SellCourses = () => {
  const { token, user } = useSelector((state) => state?.authReducer);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [markDoneModal, setMarkDoneModal] = useState(false);
  const [SelectedItem, setSelectedItem] = useState(null);
  const [isMarkDone, setIsMarkDone] = useState(false);
  const getAllMyCourse = async () => {
    const apiUrl = BaseUrl(`tutor/my/sell/lessons`);
    setIsLoading(true);
    const response = await Get(apiUrl, token);
    if (response !== undefined) {
      setData(response?.data?.sellLessons);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getAllMyCourse();
  }, []);

  const handleMarkDone = async () => {
    const apiUrl = BaseUrl(
      `tutor/purchase/lesson/markdone/${SelectedItem?._id}`
    );
    setIsMarkDone(true);
    const response = await Put(apiUrl, { isDone: true }, token);
    if (response !== undefined) {
      const tempArr = [...data];
      const findIndex = tempArr?.findIndex(
        (ele) => ele?._id == response?.data?.purchase?._id
      );
      tempArr?.splice(findIndex, 1, response?.data?.purchase);
      setData(tempArr);
      toast.success("Mark Done Successfully");
      setMarkDoneModal(false);
    }
    setIsMarkDone(false);
  };

  return (
    <>
      <NavBar />
      <HeroSection
        heading={`My Sell Lesson`}
        para={
          "In publ commonly used to demonstrate the visual form of a document or a typeface without relying"
        }
      />
      <div className={classes.pageMain}>
        <Container>
          <Row className="gy-3">
            {data?.length == 0 ? (
              <NoData />
            ) : (
              data?.map((item, i) => {
                return (
                  <Col key={i} className={classes.cardColumn} lg={4} md={6}>
                    <StudentCard
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item?.isDone) {
                          return toast.warn("You Already Mark Done this User");
                        }
                        setMarkDoneModal(true);
                        setSelectedItem(item);
                      }}
                      item={item?.student}
                      dayTime={item}
                    />
                  </Col>
                );
              })
            )}
          </Row>
        </Container>
      </div>
      <Footer />
      {markDoneModal && (
        <MarkDoneModal
          isMarkDone={isMarkDone}
          handleMarkDone={handleMarkDone}
          setShow={setMarkDoneModal}
          show={markDoneModal}
        />
      )}
    </>
  );
};

export default SellCourses;
