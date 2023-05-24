import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillStar, AiOutlineClockCircle } from "react-icons/ai";
import { BiCertification } from "react-icons/bi";
import { FaChalkboardTeacher, FaUserCircle } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { ImPriceTag } from "react-icons/im";
import { MdVerifiedUser } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Get } from "../../AxiosFunction/AxiosFunction";
import Button from "../../Components/Button/Button";
import CourseCard from "../../Components/CourseCard";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import NoData from "../../Components/NoData";
import { BaseUrl } from "../../Config/apiUrl";
import { BiCode } from "react-icons/bi";
import { TbMathFunction } from "react-icons/tb";
import { AiOutlineLineChart } from "react-icons/ai";
import { GiMaterialsScience } from "react-icons/gi";
import { FaCoins } from "react-icons/fa";
import { HeroImage, heroBg, logo, studentImg } from "../../Constant/ImagePath";

import classes from "./Landing.module.css";
import { useSelector } from "react-redux";
const RenderCompOne = ({ item }) => {
  return (
    <div className={classes.comfortMain}>
      <div className={classes.icon}>{item?.icon}</div>
      <h5>{item?.heading}</h5>
      <p>{item?.text}</p>
    </div>
  );
};
const RenderCompTwo = ({ item }) => {
  return (
    <div className={classes.comfortMainTwo}>
      <div className={classes.icon}>{item?.icon}</div>
      <div>
        <h5>{item?.heading}</h5>
        <p>{item?.text}</p>
      </div>
    </div>
  );
};
const RenderCompThree = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(item?.path)}
      className={classes.comfortMainTwo}
    >
      <div className={classes.icon}>{item?.icon}</div>
      <div>
        <h5>{item?.heading}</h5>
        <p>{item?.text}</p>
      </div>
    </div>
  );
};
const Landing = () => {
  const { isLogin } = useSelector((state) => state?.authReducer);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(false);
  const [PurchaseLesson, setPurchaseLesson] = useState([]);
  const getAllMyCourse = async () => {
    const apiUrl = BaseUrl(`lessons?page=${page}`);
    setIsLoading(true);
    const response = await Get(apiUrl);
    if (response !== undefined) {
      setTotalCount(response?.data?.courseCount);
      setPurchaseLesson(response?.data?.purchaseLessons);
      if (page == 1) {
        setData(response?.data?.lessons);
      } else {
        response?.data?.courses?.map((item) => {
          setData((pre) => [...pre, item]);
        });
      }
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getAllMyCourse();
  }, [page]);

  console.log(data, "datadatadata");
  return (
    <>
      <NavBar />
      <div className={classes.heroSectinMain}>
        <Container>
          <Row className="align-items-center">
            <Col lg={5} md={12}>
              <div className={classes.heroLeftCol}>
                <h2>
                  Conquer IBA Coursework with{" "}
                  <span> Personalized Assistance</span>
                </h2>
                <p>
                  Our platform offers one-on-one tutoring from IBA existing IBA
                  students and alumni who understand your struggles and are
                  willing to help you do better in terms of learnign and Grades.
                  Let's make learning easier together
                </p>
                <Button
                  onClick={() => {
                    if (isLogin) {
                      navigate(`${"/find-tutors"}/${"991"}`);
                    } else {
                      navigate("/login");
                    }
                  }}
                  label={"Get Started"}
                />
              </div>
            </Col>
            <Col lg={7} md={12}>
              <div className={classes.imageMain}>
                <img src={HeroImage} alt={`hero image`} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <section className={classes.noOfUsersSection}>
        <Container>
          <ul className={classes["information-list"]}>
            <li>
              <div className={classes["information-list__card"]}>
                <h3>{data?.length}+</h3>
                <p>Experienced Tutor</p>
              </div>
            </li>
            <li>
              <div className={classes["information-list__card"]}>
                <h3>{PurchaseLesson?.length}+</h3>
                <p>Sessions Booked</p>
              </div>
            </li>
            <li>
              {/* AiFillStar */}
              <div
                className={[
                  classes["information-list__card"],
                  classes["nformation-list__rating-info"],
                ].join(" ")}
              >
                <div className={classes["information-list__heading"]}>
                  <AiFillStar color={`var(--main-color)`} size={`20`} />{" "}
                  <h3>Trustpilot</h3>
                </div>

                <div className={classes["information-list__stars"]}>
                  <ul>
                    <li>
                      <AiFillStar color="#fff" size={16} />
                    </li>
                    <li>
                      <AiFillStar color="#fff" size={16} />
                    </li>
                    <li>
                      <AiFillStar color="#fff" size={16} />
                    </li>
                    <li>
                      <AiFillStar color="#fff" size={16} />
                    </li>
                    <li>
                      <AiFillStar color="#fff" size={16} />
                    </li>
                  </ul>
                </div>

                <div className={classes["information-list__description"]}>
                  <p>Trust Score: 4.1</p>
                </div>
              </div>
            </li>
            <li>
              <div className={[classes["information-list__card"]].join(" ")}>
                <h3>50+</h3>
                <p>Subject taught</p>
              </div>
            </li>
            <li>
              <div className={[classes["information-list__card"]].join(" ")}>
                <h3>60+</h3>
                <p>Number Of Students</p>
              </div>
            </li>
          </ul>
        </Container>
      </section>

      <section>
        <Container>
          <div className={classes.categoryMain}>
            <Row className={classes.degreesRow}>
              {degressArr?.map((ele) => {
                return (
                  <Col className={classes.degreesCol} lg={4} md={6}>
                    <RenderCompThree item={ele} />
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
      </section>

      <section className={classes.courseSection}>
        <h1>
          Our <span>Tutors</span>
        </h1>
        <p className={classes.courseText}>
          If you haven’t already, you should take an online course so you can
          understand what it’s like to study online.
        </p>

        <Container>
          <Row className="gy-4">
            {data?.length == 0 ? (
              <NoData />
            ) : (
              data?.map((item, i) => {
                return (
                  <Col
                    key={i}
                    className={classes.cardColumn}
                    lg={12}
                    md={12}
                    sm={12}
                  >
                    <CourseCard
                      onClick={() =>
                        navigate(`/course-detail/${item?._id}`, { state: item })
                      }
                      item={item}
                    />
                  </Col>
                );
              })
            )}
          </Row>
          {totalCount > 30 && data?.length !== totalCount && (
            <div className={classes.viewAllBtn}>
              <Button onClick={() => setPage(page + 1)} label={"View All"} />
            </div>
          )}
        </Container>

        <div className={classes.monthlyRow}>
          <Container>
            <Row>
              <div className={classes.fullImageMain}>
                <img src={studentImg} />
              </div>
              <div className={classes.circleMain}>
                <div className={classes.circle}>
                  <img src={logo} />
                </div>
              </div>
              <div className={classes.content}>
                <h4>Hundreds of thousands of students join us monthly</h4>
                <p>
                  Join a Thriving Learning Community Each Month and turn your
                  academic dreams into reality. Our expert tutors are the key to
                  unlocking your potential and transforming your IBA journey.
                </p>
                <Button
                  onClick={() => navigate(`${"/find-tutors"}/${"991"}`)}
                  label={"Start Learning"}
                />
              </div>
            </Row>
          </Container>
        </div>
        <div className={classes.monthlyRow}>
          <Container>
            <Row>
              <div className={classes.comportHeader}>
                <div className={classes.comportIcon}>
                  <TbWorld size={35} color="#fff" />
                </div>
                <h4>Make The World Your comfort zone</h4>
                <p>Speak Naturally with proessional online </p>
              </div>
              {comportArr?.map((ele, i) => {
                return (
                  <Col key={i} md={3} sm={6}>
                    <RenderCompOne item={ele} />
                  </Col>
                );
              })}
            </Row>
            <Row className="gy-3">
              <div className={classes.focusMain}>
                <h4>Focus on the skills you need</h4>
                <p>Prepare to achieve your goals with private tutors</p>
              </div>
              {focusArr?.map((ele, i) => {
                return (
                  <Col key={i} md={6}>
                    <RenderCompTwo item={ele} />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Landing;

const comportArr = [
  {
    icon: <BiCertification size={23} color="var(--main-color)" />,
    heading: "Expert tutors",
    text: "Unlocking Potential, One Student at a Time",
  },
  {
    icon: <MdVerifiedUser size={23} color="var(--main-color)" />,
    heading: "Verified Profiles",
    text: "We carefully check and confirm each tutor's profile",
  },
  {
    icon: <FaUserCircle size={23} color="var(--main-color)" />,
    heading: "Learn anytime",
    text: "Take online lessons at the perfect time for your busy schedule",
  },
  {
    icon: <ImPriceTag size={23} color="var(--main-color)" />,
    heading: "Affordable prices",
    text: "Take online lessons at the perfect time for your busy schedule",
  },
];

const focusArr = [
  {
    icon: <MdVerifiedUser size={23} color="var(--main-color)" />,
    heading: "Take Charge of Your Learning",
    text: "Harness the power of one-on-one tutoring and gain control over your IBA coursework. You're not alone in this journey.",
  },
  {
    icon: <MdVerifiedUser size={23} color="var(--main-color)" />,
    heading: "Discover the Joy of Understanding",
    text: "Struggling with IBA courses? Our dedicated tutors can make complex concepts simple, turning your academic stress into academic success.",
  },
  {
    icon: <AiOutlineClockCircle size={23} color="var(--main-color)" />,
    heading: "Your Potential is Limitless",
    text: "Failing or withdrawing isn't the end. With personalized tutoring, rediscover your capabilities and redefine your IBA experience.",
  },
  {
    icon: <GoLocation size={23} color="var(--main-color)" />,
    heading: `Community Driven, Success Oriented`,
    text: "We are more than a tutoring platform; we are an IBA community committed to uplifting each other in our academic pursuits.",
  },
];

const degressArr = [
  {
    icon: <FaChalkboardTeacher size={40} color="var(--main-color)" />,
    heading: "BBA Tutors",
    text: "Experience Teachers",
    path: `/find-tutors/${"bba"}`,
  },
  {
    icon: <AiOutlineLineChart size={40} color="var(--main-color)" />,
    heading: "BS Accounting and Finance Tutors",
    text: "Experience Teachers",
    path: `/find-tutors/${"BS-Accounting-and-Finance"}`,
  },
  {
    icon: <FaCoins size={40} color="var(--main-color)" />,
    heading: "BS Economics Tutors",
    text: "Experience Teachers",
    path: `/find-tutors/${"BS-Economics"}`,
  },
  {
    icon: <TbMathFunction size={40} color="var(--main-color)" />,
    heading: "BS Math and Economics Tutors",
    text: "Experience Teachers",
    path: `/find-tutors/${"BS-Math-and-Economics"}`,
  },
  {
    icon: <GiMaterialsScience size={40} color="var(--main-color)" />,
    heading: "BS Social Science Tutors",
    text: "Experience Teachers",
    path: `/find-tutors/${"BS-Social-Science"}`,
  },
  {
    icon: <BiCode size={40} color="var(--main-color)" />,
    heading: "Computer Science Tutors",
    text: "Experience Teachers",
    path: `/find-tutors/${"Computer-Science"}`,
  },
];
