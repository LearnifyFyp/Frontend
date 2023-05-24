import React from "react";
import classes from "./CreateMeeting.module.css";
import HeroSection from "../../Components/HeroSection";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import { BaseUrl } from "../../Config/apiUrl";
import { Get } from "../../AxiosFunction/AxiosFunction";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
const CreateMeeting = () => {
  const { token, user } = useSelector((state) => state?.authReducer);
  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllMeetings = async () => {
    const apiUrl = BaseUrl(`tutor/my/meetings`);
    setIsLoading(true);
    const response = await Get(apiUrl, token);
    if (response !== undefined) {
      setGetData(response?.data?.data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getAllMeetings();
  }, []);

  return (
    <>
      <NavBar />
      <HeroSection
        heading={`My All Meetings`}
        para={
          "In publ commonly used to demonstrate the visual form of a document or a typeface without relying"
        }
      />

      <Footer />
    </>
  );
};

export default CreateMeeting;
