import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Post, Put } from "../../AxiosFunction/AxiosFunction";
import AddItem from "../../Components/AddItem/indxe";
import Button from "../../Components/Button/Button";
import DropDown from "../../Components/DropDown";
import Footer from "../../Components/Footer";
import HeroSection from "../../Components/HeroSection";
import Input from "../../Components/Input/Input";
import NavBar from "../../Components/NavBar";
import TextArea from "../../Components/TextArea/TextArea";
import { BaseUrl } from "../../Config/apiUrl";
import classes from "./CreateAndUpdateTutorCourse.module.css";
const CreateAndUpdateTutorCourse = () => {
  const [weekDays, setWeekDays] = useState(false);
  const [time, setTime] = useState(false);
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state?.authReducer);
  const [isloading, setIsloading] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [category, setCategory] = useState("");

  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [certification, setCertification] = useState([]);
  const [speaks, setSpeaks] = useState([]);
  const [subject, setSubject] = useState([]);
  const [link, setLink] = useState("");
  const [qualification, setQualification] = useState("");
  const [experiance, setExperiance] = useState("");
  const [about, setAbout] = useState("");
  const [availableArr, setAvailableArr] = useState([]);
  const location = useLocation()?.state;
  // Create an array of day names
  useEffect(() => {
    if (location !== null) {
      setQualification(location?.qualification);
      setCertification(location?.certification);
      setExperiance(location?.experiance);
      setSubject(location?.subject);
      setSpeaks(location?.speaks);
      setAbout(location?.about);
      setCountry(location?.country);
      setCity(location?.city);
      setLink(location?.link);
      setPrice(location?.price);
      setAvailableArr(location?.available);
    }
  }, []);

  const handleCreateUpdate = async () => {
    const apiUrl = BaseUrl(
      location == null ? `tutor/lesson` : `tutor/lesson/${location?._id}`
    );
    const body = {
      qualification,
      certification,
      subject,
      experiance,
      speaks,
      about,
      country,
      city,
      link,
      price,
      available: availableArr,
    };
    for (let key in body) {
      if (body[key] == "" || body[key] == null) {
        return toast.error("Please Fill all the Fields");
      }
    }
    if (about?.length < 20) {
      return toast.error("About should have more than 20 characters");
    }
    setIsloading(true);
    const response =
      location == null
        ? await Post(apiUrl, body, token)
        : await Put(apiUrl, body, token);
    if (response !== undefined) {
      toast.success(
        location == null
          ? "Create course successfully"
          : "Update course successfully"
      );
      navigate(-1);
    }
    setIsloading(false);
  };

  const handleAddSubject = () => {
    if (category == "" || courseName == "") {
      return toast.error("Please Fill Fields");
    }
    const subArr = [];
    category?.forEach((ele) => subArr.push(ele?.value));
    setSubject((prev) => [
      { field: courseName?.value, category: subArr },
      ...prev,
    ]);

    setCategory("");
    setCourseName("");
  };
  const handleAddAvilability = () => {
    if (weekDays == "" || time == "") {
      return toast.error("Please Fill Fields");
    }
    const subArr = [];
    time?.forEach((ele) => subArr.push(ele?.value));
    const getDay = availableArr?.map((item) => item?.days);
    console.log(getDay, "getDaygetDay");
    if (getDay?.includes(weekDays?.value)) {
      const tempArr = [...availableArr];
      const findIndex = tempArr?.findIndex(
        (ele) => ele?.days == weekDays?.value
      );
      const sliceTime = tempArr[findIndex]["times"];
      const mainArr = [...subArr, ...sliceTime];
      tempArr?.splice(findIndex, 1, { days: weekDays?.value, times: mainArr });
      setAvailableArr(tempArr);
    } else {
      setAvailableArr((prev) => [
        { days: weekDays?.value, times: subArr },
        ...prev,
      ]);
    }

    setWeekDays("");
    setTime("");
  };
  let convertCamelCase =
    courseName &&
    courseName?.value
      ?.toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

  if (user?.role !== "tutor") {
    return <Navigate to={"/"} />;
  } else {
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
        padding:8px 10px;
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
      .MuiFormControl-root.MuiTextField-root{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        // height:48px;
      }
      .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputAdornedEnd{
        padding:12px 10px;
      }
      
      `}
        </style>
        <NavBar />
        <HeroSection
          heading={location == null ? `Create Profile` : "Update Profile"}
          para={
            "In publ commonly used to demonstrate the visual form of a document or a typeface without relying"
          }
        />
        <div className={classes.pageMain}>
          <Container>
            <Row className="gy-4">
              <Col md={12}>
                <div className={classes.profileImage}>
                  <img src={user?.avatar?.url} />
                </div>
              </Col>

              <Col md={6}>
                <Input
                  placeholder={"First Name"}
                  label={"First Name"}
                  value={user?.name}
                />
              </Col>
              <Col md={6}>
                <Input
                  placeholder={"Last Name"}
                  label={"Last Name"}
                  value={user?.name}
                />
              </Col>
              <Col md={12}>
                <TextArea
                  setter={setAbout}
                  value={about}
                  label={"About"}
                  placeholder={"About"}
                />
              </Col>
              <Col md={6}>
                <Input
                  placeholder={"Email"}
                  label={"Email"}
                  value={user?.email}
                />
              </Col>
              <Col md={6}>
                <Input
                  placeholder={"Phone"}
                  label={"Phone"}
                  value={user?.phone}
                />
              </Col>

              <Col md={6}>
                <Input
                  type={"number"}
                  setter={setPrice}
                  value={price}
                  label={"Price Per Lesson"}
                  placeholder={"Price Per Lesson"}
                />
              </Col>
              <Col md={6}>
                <Input
                  setter={setCity}
                  value={city}
                  label={"City"}
                  placeholder={"City"}
                />
              </Col>
              <Col md={6}>
                <Input
                  setter={setCountry}
                  value={country}
                  label={"Country"}
                  placeholder={"Country"}
                />
              </Col>
              <Col md={6}>
                <Input
                  setter={setLink}
                  value={link}
                  label={"Link"}
                  placeholder={"Link"}
                />
              </Col>
              <Col md={12}>
                <AddItem
                  setter={setCertification}
                  value={certification}
                  label={"Add Certification"}
                />
              </Col>
              <Col md={12}>
                <AddItem
                  setter={setSpeaks}
                  value={speaks}
                  label={"Add Language"}
                />
              </Col>
              <Row>
                <Col lg={6} md={6}>
                  <DropDown
                    setter={setCourseName}
                    value={courseName}
                    label={"Choose Your Degree"}
                    option={option}
                  />
                </Col>
                <Col lg={6} md={6}>
                  <DropDown
                    isMulti={true}
                    setter={setCategory}
                    value={category}
                    label={"Choose Course"}
                    option={courseName ? subjectOption[convertCamelCase] : []}
                  />
                </Col>
                <Col lg={12} md={12}>
                  <div className={classes.addBtnMain}>
                    <Button onClick={handleAddSubject} label={"Add Subject"} />
                  </div>
                </Col>
                <Col md={12}>
                  {subject?.length > 0 &&
                    subject?.map((ele, ind) => {
                      return (
                        <div key={ind} className={classes.renderMain}>
                          <div className={classes.rennderDiv}>
                            <h5>{ele?.field}</h5>
                            <span
                              onClick={() =>
                                setSubject(
                                  subject?.filter(
                                    (item, index) => index !== ind
                                  )
                                )
                              }
                            >
                              <BsTrash color="#fff" size={20} />
                            </span>
                          </div>
                          <div className={classes.renderInner}>
                            {ele?.category?.map((item, i) => {
                              return (
                                <div key={i}>
                                  <p>{item}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </Col>
              </Row>
              <Col md={6}>
                <TextArea
                  setter={setQualification}
                  value={qualification}
                  label={"Qualification"}
                  placeholder={"Qualification"}
                />
              </Col>
              <Col md={6}>
                <TextArea
                  setter={setExperiance}
                  value={experiance}
                  label={"Experiance"}
                  placeholder={"Experiance"}
                />
              </Col>

              <Row className="gy-3">
                <Col lg={6} md={6}>
                  <DropDown
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
                <Col lg={6} md={6}>
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
                <Col lg={12} md={12}>
                  <div className={classes.addBtnMain}>
                    <Button onClick={handleAddAvilability} label={"+ Add"} />
                  </div>
                </Col>
                <Col md={12}>
                  {availableArr?.length > 0 &&
                    availableArr?.map((ele, ind) => {
                      return (
                        <div key={ind} className={classes.renderMain}>
                          <div className={classes.rennderDiv}>
                            <h5>{ele?.days}</h5>
                            <span
                              onClick={() =>
                                setAvailableArr(
                                  availableArr?.filter(
                                    (item, index) => index !== ind
                                  )
                                )
                              }
                            >
                              <BsTrash color="#fff" size={20} />
                            </span>
                          </div>
                          <div className={classes.renderInner}>
                            {ele?.times?.map((item, i) => {
                              return (
                                <div key={i}>
                                  <p>{item}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </Col>
              </Row>

              <Col md={12}>
                <Button
                  disabled={isloading}
                  onClick={handleCreateUpdate}
                  label={
                    location == null
                      ? isloading
                        ? "Creating..."
                        : "Create Profile"
                      : isloading
                      ? "Updating..."
                      : "Update Profile"
                  }
                />
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
};

export default CreateAndUpdateTutorCourse;
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
