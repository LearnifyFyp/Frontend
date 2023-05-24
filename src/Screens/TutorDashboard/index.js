import React from "react";
import classes from "./TutorDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Components/Footer";
import HeroSection from "../../Components/HeroSection";
import NavBar from "../../Components/NavBar";
import { BaseUrl } from "../../Config/apiUrl";
import { Delete, Get, Patch, Post } from "../../AxiosFunction/AxiosFunction";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CourseCard from "../../Components/CourseCard";
import { teacher } from "../../Constant/ImagePath";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import AreYouSureModal from "../../Components/AreYouSureModal";
import { toast } from "react-toastify";
import NoData from "../../Components/NoData";
const TutorDashboard = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state?.authReducer);
  const [getMyData, setGetMyData] = useState([]);
  const [isApiCall, setIsApiCall] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // Get APi
  const getMyProfile = async () => {
    const apiUrl = BaseUrl(`tutor/my/lesson`);
    setIsApiCall(true);
    const response = await Get(apiUrl, token);
    if (response !== undefined) {
      setGetMyData(response?.data?.lesson);
    }
    setIsApiCall(false);
  };
  useEffect(() => {
    getMyProfile();
  }, []);

  if (user?.role !== "tutor") {
    return navigate("/");
  } else {
    return (
      <>
        <NavBar />
        <HeroSection
          heading={`Welcome ${user?.name}`}
          para={
            "In publ commonly used to demonstrate the visual form of a document or a typeface without relying"
          }
        />
        <div className={classes.pageMain}>
          <Container>
            <div className={classes.header}>
              <h4>My Profile</h4>
              {getMyData?.length < 1 && (
                <Button
                  onClick={() => {
                    setSelectedItem(null);
                    navigate("/create-and-update-tutor-course", {
                      state: null,
                    });
                  }}
                  label={"Create Profile"}
                />
              )}
            </div>
            <Row className="gy-4">
              {getMyData?.length == 0 ? (
                <NoData />
              ) : (
                getMyData?.map((item, index) => {
                  return (
                    <Col
                      key={index}
                      className={classes.cardColumn}
                      lg={12}
                      md={12}
                    >
                      <CourseCard
                        onEdit={() => {
                          navigate("/create-and-update-tutor-course", {
                            state: item,
                          });
                        }}
                        onClick={() =>
                          navigate(`/course-detail/${item?._id}`, {
                            state: item,
                          })
                        }
                        item={item}
                      />
                    </Col>
                  );
                })
              )}
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
};

export default TutorDashboard;
const productArr = [
  {
    name: "Pre Engeneering",
    price: "100",
    category: "English",
    startTime: "07:00AM",
    endTime: "09:00AM",
    description:
      "If you haven’t already, you should take an online course so you can understand what it’s like to study online.",
    rating: 4,
    reviews: "100",
    image: teacher,
    _id: 1,
  },
  {
    name: "Pre Engeneering",
    price: "100",
    category: "English",
    startTime: "07:00AM",
    endTime: "09:00AM",
    description:
      "If you haven’t already, you should take an online course so you can understand what it’s like to study online.",
    rating: 4,
    reviews: "100",
    image: teacher,
    _id: 2,
  },
  {
    name: "Pre Engeneering",
    price: "100",
    category: "English",
    startTime: "07:00AM",
    endTime: "09:00AM",
    description:
      "If you haven’t already, you should take an online course so you can understand what it’s like to study online.",
    rating: 4,
    reviews: "100",
    image: teacher,
    _id: 3,
  },
  {
    name: "Pre Engeneering",
    price: "100",
    category: "English",
    startTime: "07:00AM",
    endTime: "09:00AM",
    description:
      "If you haven’t already, you should take an online course so you can understand what it’s like to study online.",
    rating: 4,
    reviews: "100",
    image: teacher,
    _id: 4,
  },
  {
    name: "Pre Engeneering",
    price: "100",
    category: "English",
    startTime: "07:00AM",
    endTime: "09:00AM",
    description:
      "If you haven’t already, you should take an online course so you can understand what it’s like to study online.",
    rating: 4,
    reviews: "100",
    image: teacher,
    _id: 5,
  },
  {
    name: "Pre Engeneering",
    price: "100",
    category: "English",
    startTime: "07:00AM",
    endTime: "09:00AM",
    description:
      "If you haven’t already, you should take an online course so you can understand what it’s like to study online.",
    rating: 4,
    reviews: "100",
    image: teacher,
    _id: 6,
  },
];
