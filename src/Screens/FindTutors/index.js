import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Get } from "../../AxiosFunction/AxiosFunction";
import Button from "../../Components/Button/Button";
import CourseCard from "../../Components/CourseCard";
import DropDown from "../../Components/DropDown";
import Footer from "../../Components/Footer";
import HeroSection from "../../Components/HeroSection";
import Input from "../../Components/Input/Input";
import NavBar from "../../Components/NavBar";
import NoData from "../../Components/NoData";
import { BaseUrl } from "../../Config/apiUrl";
import { teacher } from "../../Constant/ImagePath";
import classes from "./FindTutors.module.css";
const FindTutors = () => {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [time, setTime] = useState("");
  const [weekDays, setWeekDays] = useState("");
  const [courseName, setCourseName] = useState("");
  const navigate = useNavigate();
  const paramsSlud = useParams()?.slug;

  const queryStr = `&field=${
    paramsSlud == "991"
      ? courseName == ""
        ? ""
        : courseName?.value
      : paramsSlud
  }&category=${category?.value ? category?.value : ""}&maxPrice=${
    price === "" ? "" : Number(price)
  }&minRating=${rating === "" ? "" : Number(rating?.value)}&days=${
    weekDays == "" ? "" : weekDays?.map((ele) => ele?.value)
  }&time=${time == "" ? "" : time?.map((ele) => ele?.value)}`;
  const getAllTutors = async () => {
    const apiUrl = BaseUrl(`lessons?page=${page}${queryStr}`);
    setIsLoading(true);
    const response = await Get(apiUrl);
    if (response !== undefined) {
      setTotalCount(response?.data?.courseCount);
      if (page == 1) {
        setTutors(response?.data?.lessons);
      } else {
        response?.data?.courses?.map((item) => {
          setTutors((pre) => [...pre, item]);
        });
      }
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getAllTutors();
  }, []);
  const applyBtn = async () => {
    await getAllTutors();
  };

  let convertCamelCase =
    paramsSlud !== "991"
      ? paramsSlud
          ?.toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
      : courseName &&
        courseName?.value
          ?.toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

  return (
    <>
      <style>
        {`
        .MuiStack-root{
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px
        }
      .MuiFormControl-root.MuiTextField-root{
        width: 100% !important;
        
      }
      .MuiInputBase-input.MuiOutlinedInput-input{
        background:var(--white-color);
      }
      .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl{
        border-radius:0px;  
      }
      .MuiOutlinedInput-notchedOutline{
        border:none;
      }
      .MuiDialogActions-root.MuiDialogActions-spacing.MuiPickersLayout-actionBar button:first-child{
        display:none;
      }
      
      `}
      </style>
      <NavBar />
      <HeroSection
        heading={"Find the Best Tutors"}
        para={
          "Discover Top-Quality Tutors with Just a Few Clicks – Streamline Your Learning Journey Now!"
        }
      />
      <div className={classes.pageMain}>
        <Container>
          <Row className="gy-3">
            {paramsSlud == "991" && (
              <Col md={4}>
                <DropDown
                  setter={setCourseName}
                  value={courseName}
                  label={"Program"}
                  option={option}
                />
              </Col>
            )}
            <Col md={4}>
              <DropDown
                setter={setCategory}
                value={category}
                label={"Courses"}
                option={paramsSlud ? subjectOption[convertCamelCase] : []}
              />
            </Col>
            <Col md={4}>
              <Input
                type={"number"}
                setter={setPrice}
                value={price}
                label={"Max Price"}
                placeholder={"Max Price"}
              />
            </Col>
            <Col md={4}>
              <DropDown
                type={"number"}
                setter={setRating}
                value={rating}
                label={"Rating"}
                placeholder={"Rating"}
                option={[
                  { label: "1 Star", value: 1 },
                  { label: "2 Star", value: 2 },
                  { label: "3 Star", value: 3 },
                  { label: "4 Star", value: 4 },
                  { label: "5 Star", value: 5 },
                ]}
              />
            </Col>
            <Col md={paramsSlud == "991" ? 4 : 6}>
              <DropDown
                isMulti={true}
                option={[
                  { label: "Sunday", value: "Sunday" },
                  { label: "Monday", value: "Monday" },
                  { label: "Tuesday", value: "Tuesday" },
                  { label: "Wednesday", value: "Wednesday" },
                  { label: "Thursday", value: "Thursday" },
                  { label: "Friday", value: "Friday" },
                  { label: "Saturday", value: "Saturday" },
                ]}
                label={"Week Days"}
                setter={setWeekDays}
                value={weekDays}
              />
            </Col>
            <Col md={paramsSlud == "991" ? 4 : 6}>
              <DropDown
                isMulti={true}
                option={[
                  { label: "00:00 AM", value: "00:00 AM" },
                  { label: "01:00 AM", value: "01:00 AM" },
                  { label: "02:00 AM", value: "02:00 AM" },
                  { label: "03:00 AM", value: "03:00 AM" },
                  { label: "04:00 AM", value: "04:00 AM" },
                  { label: "05:00 AM", value: "05:00 AM" },
                  { label: "06:00 AM", value: "06:00 AM" },
                  { label: "07:00 AM", value: "07:00 AM" },
                  { label: "08:00 AM", value: "08:00 AM" },
                  { label: "09:00 AM", value: "09:00 AM" },
                  { label: "10:00 AM", value: "10:00 AM" },
                  { label: "11:00 AM", value: "11:00 AM" },
                  { label: "12:00 PM", value: "12:00 PM" },
                  { label: "13:00 PM", value: "13:00 PM" },
                  { label: "14:00 PM", value: "14:00 PM" },
                  { label: "15:00 PM", value: "15:00 PM" },
                  { label: "16:00 PM", value: "16:00 PM" },
                  { label: "17:00 PM", value: "17:00 PM" },
                  { label: "18:00 PM", value: "18:00 PM" },
                  { label: "19:00 PM", value: "19:00 PM" },
                  { label: "20:00 PM", value: "20:00 PM" },
                  { label: "21:00 PM", value: "21:00 PM" },
                  { label: "22:00 PM", value: "22:00 PM" },
                  { label: "23:00 PM", value: "23:00 PM" },
                ]}
                label={"Time slot"}
                setter={setTime}
                value={time}
              />
            </Col>
          </Row>

          <Row className={classes.timeSlotRow}>
            <Col md={12}>
              <div className={classes.applyBtnMain}>
                <Button
                  disabled={isLoading}
                  onClick={applyBtn}
                  label={isLoading ? "Applying..." : "Apply"}
                />
              </div>
            </Col>
          </Row>
          <Row className="gy-4">
            {tutors?.length == 0 ? (
              <NoData />
            ) : (
              tutors?.map((item, i) => {
                return (
                  <Col key={i} className={classes.cardColumn} lg={12} md={12}>
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

          {totalCount !== tutors?.length && totalCount > 20 && (
            <div className={classes.viewAllBtn}>
              <Button
                onClick={() => setPage((pre) => pre + 1)}
                label={"View All"}
              />
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default FindTutors;
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

const subjectOption = {
  bsMathAndEconomics: [
    { label: "Applied Econometrics II", value: "Applied Econometrics II" },
    {
      label: "Research Methods for Economics",
      value: "Research Methods for Economics",
    },
    {
      label: "International Trade or International Economics",
      value: "International Trade or International Economics",
    },
    { label: "Economics Elective I", value: "Economics Elective I" },
    { label: "Economics Elective II", value: "Economics Elective II" },
    { label: "Public Economics", value: "Public Economics" },
    { label: "Public Finance", value: "Public Finance" },
    { label: "Monetary Economics", value: "Monetary Economics" },
    { label: "Time Series Econometrics", value: "Time Series Econometrics" },
    { label: "Climate Change Economics", value: "Climate Change Economics" },
    {
      label: "Natural Resource and Environmental Economics",
      value: "Natural Resource and Environmental Economics",
    },
    { label: "Labour Economics", value: "Labour Economics" },
    { label: "Economic Forecasting", value: "Economic Forecasting" },
    { label: "Economics", value: "Economics" },
    { label: "Time Series Modeling", value: "Time Series Modeling" },
    { label: "Industrial Economics", value: "Industrial Economics" },
    {
      label: "Water Economics and Policy",
      value: "Water Economics and Policy",
    },
    {
      label: "Contemporary Issues in Global Economics",
      value: "Contemporary Issues in Global Economics",
    },
    {
      label: "History of Economic Thought",
      value: "History of Economic Thought",
    },
    { label: "Development Economics II", value: "Development Economics II" },
    {
      label: "Major Issues in Pakistan Economy",
      value: "Major Issues in Pakistan Economy",
    },
    {
      label: "Calculus-I with Plane Geometry",
      value: "Calculus-I with Plane Geometry",
    },
    { label: "Discrete Mathematics", value: "Discrete Mathematics" },
    {
      label: "Calculus-II with Solid Geometry",
      value: "Calculus-II with Solid Geometry",
    },
    { label: "Linear Algebra", value: "Linear Algebra" },
    {
      label: "Introduction to Differential Equations",
      value: "Introduction to Differential Equations",
    },
    { label: "Multivariable Calculus1", value: "Multivariable Calculus1" },
    {
      label: "Partial Differential Equations?",
      value: "Partial Differential Equations?",
    },
    { label: "Optimization Techniques", value: "Optimization Techniques" },
    { label: "Stochastic Process", value: "Stochastic Process" },
    {
      label: "Probability & Statistical Models",
      value: "Probability & Statistical Models",
    },
    { label: "Real Analysis |", value: "Real Analysis |" },
    { label: "Mathematics elective I", value: "Mathematics elective I" },
    { label: "Mathematics elective II", value: "Mathematics elective II" },
    { label: "Fluid Dynamics II", value: "Fluid Dynamics II" },
    {
      label:
        "Financial Mathematics with a computational approach Computational Finance",
      value:
        "Financial Mathematics with a computational approach Computational Finance",
    },
    {
      label:
        "Modern Algebra I (Galios Theory & Applications) Modern Algebra II (Commutative Rings & Fields)",
      value:
        "Modern Algebra I (Galios Theory & Applications) Modern Algebra II (Commutative Rings & Fields)",
    },
    { label: "Measure Theory I", value: "Measure Theory I" },
    { label: "Measure Theory II", value: "Measure Theory II" },
    { label: "Operations Research I", value: "Operations Research I" },
    { label: "Operations Research II", value: "Operations Research II" },
    {
      label: "Scientific Computing for Linear PDE's",
      value: "Scientific Computing for Linear PDE's",
    },
    {
      label: "Intoduction to Differential Topology",
      value: "Intoduction to Differential Topology",
    },
    { label: "Financial Engineering", value: "Financial Engineering" },
  ],
  bsEconomics: [
    { label: "Microeconomic Theory", value: "Microeconomic Theory" },
    { label: "Macroeconomic Theory", value: "Macroeconomic Theory" },
    { label: "Mathematical Economics", value: "Mathematical Economics" },
    {
      label: "Major sues in Pakistan's Economy",
      value: "Major sues in Pakistan's Economy",
    },
    {
      label: "Contemporary Issues in Global Economics",
      value: "Contemporary Issues in Global Economics",
    },
    { label: "Development Economics", value: "Development Economics" },
    { label: "Applied Econometrics", value: "Applied Econometrics" },
    {
      label: "Research Methods in Economics",
      value: "Research Methods in Economics",
    },
    {
      label: "International Trade or International Economics",
      value: "International Trade or International Economics",
    },
    {
      label: "History of Economic Thought",
      value: "History of Economic Thought",
    },
    { label: "Public Economics", value: "Public Economics" },
    { label: "Public Finance", value: "Public Finance" },
    { label: "Monetary Economics", value: "Monetary Economics" },
    { label: "Time Series Econometrics", value: "Time Series Econometrics" },
    { label: "Climate Change Economics", value: "Climate Change Economics" },
    { label: "Health Economics", value: "Health Economics" },
    { label: "Labour Economics", value: "Labour Economics" },
    { label: "Economic Forecasting", value: "Economic Forecasting" },
    {
      label: "Public Policy Analysis: Theory and Practice",
      value: "Public Policy Analysis: Theory and Practice",
    },
    {
      label: "Environmental and Resource Economics",
      value: "Environmental and Resource Economics",
    },
    { label: "Financial Economics", value: "Financial Economics" },
    { label: "Time Series Mok", value: "Time Series Mok" },
    { label: "Industral Economics", value: "Industral Economics" },

    {
      label: "Water Economics and Policy",
      value: "Water Economics and Policy",
    },
    {
      label: "Microeconomics for Policy Analysis",
      value: "Microeconomics for Policy Analysis",
    },
    { label: "Social Impact Evaluation", value: "Social Impact Evaluation" },
    {
      label: "Supporting courses (Mathematics & Stati",
      value: "Supporting courses (Mathematics & Stati",
    },
    {
      label: "Introduction to Statistics",
      value: "Introduction to Statistics",
    },
    { label: "Statistical Inferences", value: "Statistical Inferences" },
    {
      label: "College Algebra or Linear Algebra",
      value: "College Algebra or Linear Algebra",
    },
    {
      label: "Principles of Microeconomics",
      value: "Principles of Microeconomics",
    },
    {
      label: "Intermediate Microeconomics",
      value: "Intermediate Microeconomics",
    },
    {
      label: "Intermediate Macroeconomics",
      value: "Intermediate Macroeconomics",
    },
    {
      label: "Principles of Macroeconomics",
      value: "Principles of Macroeconomics",
    },
  ],
  bsAccountingAndFinance: [
    { label: "Principles of Accounting", value: "Principles of Accounting" },
    { label: "Management Accounting", value: "Management Accounting" },
    { label: "Financial Accounting", value: "Financial Accounting" },
    { label: "Taxation", value: "Taxation" },
    { label: "Business Law", value: "Business Law" },
    { label: "Auditing", value: "Auditing" },

    {
      label: "Advanced Managerial Accounting",
      value: "Advanced Managerial Accounting",
    },
    { label: "Financial Reporting", value: "Financial Reporting" },
    {
      label: "Corporate Governance or Code & Practice in Pakistan",
      value: "Corporate Governance or Code & Practice in Pakistan",
    },
    {
      label: "Business Analysis & Decision Making",
      value: "Business Analysis & Decision Making",
    },
    {
      label: "Legal and Regulatory Environment (only for BSAP)",
      value: "Legal and Regulatory Environment (only for BSAP)",
    },
    { label: "Strategic Management", value: "Strategic Management" },
    { label: "Corporate Law", value: "Corporate Law" },
    { label: "Criminal Law", value: "Criminal Law" },
    { label: "Competition Law", value: "Competition Law" },

    { label: "Investment Banking", value: "Investment Banking" },
    {
      label: "Treasury and Funds Management",
      value: "Treasury and Funds Management",
    },
    { label: "Financial Risk Management", value: "Financial Risk Management" },
    {
      label: "Advance Portfolio Management and Wealth Planning",
      value: "Advance Portfolio Management and Wealth Planning",
    },
    { label: "Corporate Finance", value: "Corporate Finance" },
    { label: "Financial Econometrics", value: "Financial Econometrics" },
    { label: "Public Finance", value: "Public Finance" },
    { label: "Altemative Investments", value: "Altemative Investments" },
    {
      label: "Real Estate Investments: Analysis & Financing",
      value: "Real Estate Investments: Analysis & Financing",
    },
    { label: "Intemational Barking", value: "Intemational Barking" },
    {
      label: "Behavioral finance (with lab- 4 credit)",
      value: "Behavioral finance (with lab- 4 credit)",
    },
    {
      label: "Venture Capital & the finance of Innovation",
      value: "Venture Capital & the finance of Innovation",
    },
    { label: "Buyouts and Acquisitions.", value: "Buyouts and Acquisitions." },
    { label: "Corporate Restructuring", value: "Corporate Restructuring" },
    {
      label: "Empirical Research in Finance",
      value: "Empirical Research in Finance",
    },
    { label: "Fixed Income Investments", value: "Fixed Income Investments" },
    { label: "Branch Banking", value: "Branch Banking" },
    {
      label: "Marketing of Financial services",
      value: "Marketing of Financial services",
    },
    {
      label: "Financial Information System",
      value: "Financial Information System",
    },
    { label: "Intemational Finance", value: "Intemational Finance" },
    { label: "Derivatives", value: "Derivatives" },
    {
      label: "Advanced Corporate Finance",
      value: "Advanced Corporate Finance",
    },
    { label: "Islamic Banking & Finance", value: "Islamic Banking & Finance" },
    { label: "Financial Economics", value: "Financial Economics" },
  ],
  bsSocialSciences: [
    { label: "History of Evolution", value: "History of Evolution" },
    { label: "Introduction to Geology", value: "Introduction to Geology" },
    {
      label: "Sustainable Cities and Communities",
      value: "Sustainable Cities and Communities",
    },
    {
      label: "An Introduction to the Philosophy of Mathematics",
      value: "An Introduction to the Philosophy of Mathematics",
    },
    {
      label: "Introduction to Visual Culture",
      value: "Introduction to Visual Culture",
    },
    {
      label: "Classical Antiquity to the Middle Ages",
      value: "Classical Antiquity to the Middle Ages",
    },
    {
      label: "Renaissance to the Present",
      value: "Renaissance to the Present",
    },
    { label: "Artof the Islamic World", value: "Artof the Islamic World" },
    { label: "Theories of Design", value: "Theories of Design" },
    {
      label: "Colonial and Postcolonial Visual Cultures",
      value: "Colonial and Postcolonial Visual Cultures",
    },
    {
      label: "The Rhetoric of Architecture",
      value: "The Rhetoric of Architecture",
    },
    {
      label: "Empire and Vision: Between Production",
      value: "Empire and Vision: Between Production",
    },
    { label: "Watching Films", value: "Watching Films" },
    { label: "Introduction to Drama", value: "Introduction to Drama" },
    { label: "Reading Poetry", value: "Reading Poetry" },
    { label: "Great Books", value: "Great Books" },
    {
      label: "Digital Activism and Democracy",
      value: "Digital Activism and Democracy",
    },
    {
      label: "Islamic Book Arts 1200-1800",
      value: "Islamic Book Arts 1200-1800",
    },
    {
      label: "Ethnicities, Diaspora and the Media",
      value: "Ethnicities, Diaspora and the Media",
    },
    {
      label: "Parallel Cinema, Gender and Realism",
      value: "Parallel Cinema, Gender and Realism",
    },
    {
      label: "Taking it Like 2 Man: American Masculinites in Visual Culture",
      value: "Taking it Like 2 Man: American Masculinites in Visual Culture",
    },
    {
      label: "Intellectual and Cultural History of Muslim Spain",
      value: "Intellectual and Cultural History of Muslim Spain",
    },
  ],
  computerScience: [
    { label: "Theory of Automata", value: "Theory of Automata" },
    { label: "Software Engineering", value: "Software Engineering" },
    {
      label: "Design and Analysis of Algorithms",
      value: "Design and Analysis of Algorithms",
    },
    { label: "Operating Systems", value: "Operating Systems" },
    { label: "Database Systems", value: "Database Systems" },
    {
      label: "Computer Architecture and Assembly Language",
      value: "Computer Architecture and Assembly Language",
    },
    {
      label: "Human Computer Interaction",
      value: "Human Computer Interaction",
    },
    { label: "Systems Programming", value: "Systems Programming" },
    { label: "Computer Science Project", value: "Computer Science Project" },
    {
      label: "Introduction to Artificial Intelligence",
      value: "Introduction to Artificial Intelligence",
    },
    { label: "Audit Ethics & 5 Issues", value: "Audit Ethics & 5 Issues" },
    {
      label: "Introduction to Programming",
      value: "Introduction to Programming",
    },
    {
      label: "Object Oriented Programming Techniques",
      value: "Object Oriented Programming Techniques",
    },
    { label: "Introduction to Computing", value: "Introduction to Computing" },
    { label: "Digital Logic Design", value: "Digital Logic Design" },
    { label: "Data Structures", value: "Data Structures" },
    {
      label: "Computer Communications & Networks",
      value: "Computer Communications & Networks",
    },
    {
      label: "Web Based Application Development",
      value: "Web Based Application Development",
    },
    { label: "Design Pattems ", value: "Design Pattems " },
    {
      label: "Microprocessor Interfacing",
      value: "Microprocessor Interfacing",
    },
    {
      label: "Application Development for Mobile Devices",
      value: "Application Development for Mobile Devices",
    },
    { label: "Network Security", value: "Network Security" },
    { label: "Data Warehousing", value: "Data Warehousing" },
    { label: "Social Computing", value: "Social Computing" },
    { label: "Technopreneurship", value: "Technopreneurship" },
    { label: "E-Commerce", value: "E-Commerce" },
    { label: "15 Security", value: "15 Security" },
    {
      label: "Introduction to Computer Vision",
      value: "Introduction to Computer Vision",
    },
    {
      label: "Enterprise Resource Planning",
      value: "Enterprise Resource Planning",
    },
  ],
  bba: [
    {
      label: "Principles of Microeconomics",
      value: "Principles of Microeconomics",
    },
    { label: "Principles of Accounting", value: "Principles of Accounting" },
    {
      label: "Principles of Macroeconomics",
      value: "Principles of Macroeconomics",
    },
    {
      label: "Analysis of Pakistani Industries",
      value: "Analysis of Pakistani Industries",
    },
    { label: "Management Accounting", value: "Management Accounting" },
    { label: "Business Law", value: "Business Law" },
    {
      label: "Methods of Business Research",
      value: "Methods of Business Research",
    },
    { label: "Human Resource Management", value: "Human Resource Management" },
    {
      label: "Production and Operations Management",
      value: "Production and Operations Management",
    },
    {
      label: "Marketing Issues in Pakistan",
      value: "Marketing Issues in Pakistan",
    },
    { label: "Managerial Policy", value: "Managerial Policy" },
    { label: "International Business", value: "International Business" },
    { label: "Microeconomics", value: "Microeconomics" },
    { label: "International Trade", value: "International Trade" },
    { label: "Labor Economics", value: "Labor Economics" },
    { label: "Population Economics", value: "Population Economics" },
    {
      label: "Comparative Economic System",
      value: "Comparative Economic System",
    },
    { label: "Economics and Strategy", value: "Economics and Strategy" },
    { label: "Rural Development", value: "Rural Development" },
    { label: "Financial Economics", value: "Financial Economics" },
    { label: "Game Theory", value: "Game Theory" },
    { label: "Applied Econometrics", value: "Applied Econometrics" },
    {
      label: "International Political Economy",
      value: "International Political Economy",
    },
    { label: "Monetary Economics", value: "Monetary Economics" },
    {
      label: "History of Economic Thought",
      value: "History of Economic Thought",
    },
    { label: "Agriculture Economics", value: "Agriculture Economics" },
    { label: "Regional Economics", value: "Regional Economics" },
    { label: "Health Economics", value: "Health Economics" },
    { label: "Investment Banking", value: "Investment Banking" },
    { label: "International Finance", value: "International Finance" },
    { label: "Security Analysis", value: "Security Analysis" },
    { label: "Corporate Finance", value: "Corporate Finance" },
    { label: "Portfolio Management", value: "Portfolio Management" },
    { label: "Financial Risk Management", value: "Financial Risk Management" },
    { label: "Derivatives", value: "Derivatives" },
    {
      label: "Occupational Health and Safety",
      value: "Occupational Health and Safety",
    },
    {
      label: "Industrial Relations Management",
      value: "Industrial Relations Management",
    },
  ],
};

const option = [
  {
    label: "BS Accounting and Finance",
    value: "BS-Accounting-and-Finance",
  },
  {
    label: "BS Economics",
    value: "BS-Economics",
  },
  {
    label: "BS Math and Economics",
    value: "BS-Math-and-Economics",
  },
  {
    label: "BS Social Sciences",
    value: "BS-Social-Sciences",
  },
  {
    label: "Computer Science",
    value: "Computer-Science",
  },
  {
    label: "BBA",
    value: "BBA",
  },
];
