import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import HeroSection from "../../Components/HeroSection";
import classes from "./StudentDashboard.module.css";
import Footer from "../../Components/Footer";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BaseUrl } from "../../Config/apiUrl";
import { Get, Put } from "../../AxiosFunction/AxiosFunction";
import NoData from "../../Components/NoData";
import { Col, Container, Row } from "react-bootstrap";
import CourseCard from "../../Components/CourseCard";
import CreateRatingModal from "../../Components/CreateRatingModal";
import { toast } from "react-toastify";
import PurchaseCard from "../../Components/PurchaseCard";
const StudentDashboard = () => {
  const { token, user } = useSelector((state) => state?.authReducer);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ratingModalOpen, setratingModalOpen] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const getAllMyCourse = async () => {
    const apiUrl = BaseUrl(`student/my/purchase/lessons`);
    setIsLoading(true);
    const response = await Get(apiUrl, token);
    if (response !== undefined) {
      console.log(response, "responseresponseresponse");
      setData(response?.data?.purchaseLessons);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getAllMyCourse();
  }, []);

  const handleRating = async (params) => {
    if (params?.rating === 0) {
      return toast.error("Please give us your reviews");
    }
    if (params?.comment === "") {
      return toast.error("Please fill Comment Box");
    }

    const apiUrl = BaseUrl(`review`);
    setIsRating(true);
    const response = await Put(apiUrl, params, token);
    if (response !== undefined) {
      toast.success("Reviews Send Successfully");
      setratingModalOpen(false);
    }
    setIsRating(false);
  };

  if (user?.role !== "student") {
    return <Navigate to={"/"} />;
  } else {
    return (
      <>
        <NavBar />
        <HeroSection
          heading={`Welcome ${user?.name}`}
          para={
            "Effortlessly View All Your Scheduled Sessions – Your Personalized Learning Pathway at Your Fingertips!"
          }
        />
        <div className={classes.pageMain}>
          <Container>
            <h4>All My Booked Sessions</h4>
            <Row className="gy-3">
              {data?.length == 0 ? (
                <NoData />
              ) : (
                data?.map((item, i) => {
                  return (
                    <Col key={i} className={classes.cardColumn} lg={4} md={6}>
                      <PurchaseCard
                        onRating={() => {
                          setratingModalOpen(true);
                          setSelectedData(item);
                        }}
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
        {ratingModalOpen && (
          <CreateRatingModal
            setShow={setratingModalOpen}
            show={ratingModalOpen}
            handleRating={handleRating}
            isRating={isRating}
            selectedData={selectedData}
          />
        )}
      </>
    );
  }
};

export default StudentDashboard;
