import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BiCertification } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import { Get, Post } from "../../AxiosFunction/AxiosFunction";
import Button from "../../Components/Button/Button";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/NavBar";
import NoData from "../../Components/NoData";
import PaymentFormModal from "../../Components/PaymentFormModal";
import ReviewsCard from "../../Components/ReviewsCard";
import { BaseUrl } from "../../Config/apiUrl";
import { addPayment, getAllPayment } from "../../redux/commonSlice";
import classes from "./CourseDetail.module.css";
import ErrorShowModal from "../../Components/ErrorShowModal";
const CourseDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, token, user } = useSelector((state) => state?.authReducer);
  const { allPayment } = useSelector((state) => state?.commonReducer);
  const [paymentModal, setPaymentModal] = useState(false);
  const [errorShowModa, setErrorShowModa] = useState(false);
  const [errorShowModa2, setErrorShowModa2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeObj, setSelectedTimeObj] = useState([]);
  const location = useLocation()?.state;
  const dateCheck = new Date();
  // Filter out objects where isDone is true
  const pyMentFilter = allPayment?.filter(
    (ele) => ele?.lesson === location?._id
  );
  const disabledTimes = pyMentFilter
    ?.filter((obj) => !obj.isDone)
    ?.map((obj) => obj.dayTime);
  // Filter out objects where isDone is true
  const handlkeClick = () => {
    if (!isLogin) {
      return [navigate("/login"), toast.warn("Please Login First")];
    }
    if (user?.role == "tutor") {
      return setErrorShowModa(true);
    }
    if (selectedTimeObj?.length == 0) {
      return toast.warn("Please Select Time");
    }
    setPaymentModal(true);
  };
  const handlePayment = async (params) => {
    for (let key in params) {
      if (params[key] == "") {
        return toast.error("Please Fill All Fileds");
      }
    }
    if (String(params?.cardNumber)?.length < 16) {
      return toast.error("Please FIll Valid Card Number");
    }
    if (String(params?.cvcNumber) < 3) {
      return toast.error("Please FIll Valid CVC Number");
    }
    if (String(params?.expireDate) < 4) {
      return toast.error("Please FIll Valid  Expriry Date");
    }
    const apiUrl = BaseUrl(`process/purchase/lesson/${location?._id}`);
    setIsLoading(true);
    const response = await Post(apiUrl, params, token);
    if (response !== undefined) {
      const tempObj = { ...response?.data?.purchase };
      const answer = { ...tempObj, lesson: tempObj?.lesson?._id };
      dispatch(addPayment(answer));
      toast.success("Payment Send Successfully");
      setPaymentModal(false);
      setErrorShowModa2(true);
    }
    setIsLoading(false);
  };

  const getAllMyCourse = async () => {
    const apiUrl = BaseUrl(`lessons`);
    const response = await Get(apiUrl);
    if (response !== undefined) {
      dispatch(getAllPayment(response?.data?.purchaseLessons));
    }
  };
  useEffect(() => {
    getAllMyCourse();
  }, []);

  return (
    <>
      <Navbar />
      <div className={classes.pageMain}>
        <Container>
          <Row className="align-items-start">
            <Col lg={6}>
              <div className={classes.imageMain}>
                <img src={location?.user?.avatar?.url} />
              </div>
            </Col>
            <Col lg={6}>
              <div className={classes.rightContentMain}>
                <div className={classes.btnRow}></div>
                <div className={classes.contentMain}>
                  <div className={classes.nameMain}>
                    <h5>{location?.user?.name}</h5>
                    <div>
                      <div className={classes.btnMain}>
                        <Button
                          onClick={handlkeClick}
                          label={"Book A Lesson"}
                        />
                        <Button
                          onClick={() => {
                            if (user?._id == location?.user?._id) {
                              return;
                            }
                            navigate("/chat", { state: location });
                          }}
                          label={"Message"}
                        />
                      </div>
                      <h5 className="text-center">
                        Rs. {location?.price} <span>Per hour</span>
                      </h5>
                    </div>
                  </div>

                  <div className={classes.goToTop}>
                    <p>
                      {location?.country} , {location?.city}
                    </p>
                    <div className={classes.languageMain}>
                      <p>
                        <h6>language: </h6>
                        <div>
                          {location?.speaks?.map((ele) => {
                            return <span>{ele}</span>;
                          })}
                        </div>
                      </p>
                    </div>
                    <div className={classes.exper}>
                      <h6>Experience</h6>
                      <p>{location?.experiance}</p>
                    </div>
                    <div className={classes.exper}>
                      <h6>Qualification</h6>
                      <p>{location?.qualification}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <div className={classes.certification}>
                <h4>Certification</h4>
                {location?.certification?.map((item) => {
                  return (
                    <p>
                      <span>
                        {" "}
                        <BiCertification
                          color="var(--main-color)"
                          size={20}
                        />{" "}
                      </span>
                      {item}
                    </p>
                  );
                })}
              </div>
              <div className={classes.subjectMain}>
                <h4>Subjects</h4>
                <div className={classes.fieldMain}>
                  {location?.subject?.map((ele) => {
                    return (
                      <>
                        <div className={classes.fieldInner}>
                          <h6>{ele?.field}</h6>
                          {ele?.category?.map((item) => {
                            return <p>{item}</p>;
                          })}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className={classes.subjectMain}>
                <h4>Schedule</h4>

                <div className={classes.fieldMain2}>
                  {location?.available?.map((ele) => {
                    console.log(ele, "=======");
                    const splitDays = ele?.days?.split(",");
                    return (
                      <>
                        <div className={classes.fieldInner}>
                          <h6>{splitDays[0]}</h6>
                          <h6 className={classes.dateInner}>{splitDays[1]}</h6>
                          {ele?.times?.map((item, index) => {
                            return (
                              <p
                                className={
                                  disabledTimes?.includes(
                                    `${ele?.days} ,${item}`
                                  ) && classes.disabledTime
                                }
                                style={
                                  selectedTimeObj?.day === ele?.days &&
                                  selectedTimeObj?.time === item
                                    ? {
                                        background: "var(--main-color)",
                                        color: "#fff",
                                      }
                                    : {}
                                }
                                onClick={() => {
                                  setSelectedTimeObj({
                                    day: ele?.days,
                                    time: item,
                                  });
                                }}
                              >
                                {item}
                              </p>
                            );
                          })}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className={classes.description}>
                <h4>Description About Tutors</h4>
                <p>{location?.about}</p>
              </div>
              <div className={classes.ratingMain}>
                <StarRatings
                  rating={location?.ratings}
                  starRatedColor="#FFD600"
                  numberOfStars={5}
                  name="rating"
                  starSpacing={"3px"}
                />
                <p>
                  {location?.numOfReviews} <span>Reviews</span>
                </p>
              </div>
            </Col>
          </Row>
          <div className={classes.reviewsMain}>
            <Row className="gy-3">
              <h3 className="mt-5">Students Reviews of this course</h3>
              {location?.reviews?.length == 0 ? (
                <NoData text="No Student Reviews Found!" />
              ) : (
                location?.reviews?.map((ele) => {
                  return (
                    <Col md={4}>
                      <ReviewsCard data={ele} />
                    </Col>
                  );
                })
              )}
            </Row>
          </div>
        </Container>
      </div>
      <Footer />
      {paymentModal && (
        <PaymentFormModal
          handlePayment={handlePayment}
          location={location}
          setShow={setPaymentModal}
          show={paymentModal}
          isLoading={isLoading}
          selectedTimeObj={selectedTimeObj}
        />
      )}
      {errorShowModa && (
        <ErrorShowModal
          heading={"You're Logged in as a tutor"}
          text={"Register as a student to book a lesson"}
          setShow={setErrorShowModa}
          show={errorShowModa}
        />
      )}
      {errorShowModa2 && (
        <ErrorShowModal
          headerHead={"Success"}
          heading={"Session Booked"}
          text={
            "Your session has been booked. Please check your email for the details"
          }
          setShow={setErrorShowModa2}
          show={errorShowModa2}
        />
      )}
    </>
  );
};

export default CourseDetail;
