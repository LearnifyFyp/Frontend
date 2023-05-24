import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Post } from "../../AxiosFunction/AxiosFunction";
import Button from "../../Components/Button/Button";
import Footer from "../../Components/Footer";
import HeroSection from "../../Components/HeroSection";
import Input from "../../Components/Input/Input";
import NavBar from "../../Components/NavBar";
import TextArea from "../../Components/TextArea/TextArea";
import { BaseUrl } from "../../Config/apiUrl";
import classes from "./ContactUs.module.css";
const ContactUs = () => {
  const { token, user } = useSelector((state) => state?.authReducer);
  const nameSplit = user?.name?.split(" ");
  const [firstName, setFirstName] = useState(nameSplit[0]);
  const [lastName, setLastName] = useState([nameSplit[1]]);
  const [email, setEmail] = useState(user?.email);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const apiUrl = BaseUrl(`contact/new`);
    const body = {
      message: description,
    };
    for (let key in body) {
      if (body[key] == "") {
        return toast.error("Please Fill All Fields");
      }
    }
    setIsLoading(true);
    const response = await Post(apiUrl, body, token);
    if (response !== undefined) {
      toast.success("Form Submit successfully");
      setDescription("");
    }
    setIsLoading(false);
  };
  return (
    <>
      <NavBar />
      <HeroSection
        heading={"Contact Us"}
        para={
          "In publ commonly used to demonstrate the visual form of a document or a typeface without relying"
        }
      />
      <section className={classes.sectionMain}>
        <Container>
          <Row className="gy-4">
            <Col md={6}>
              <Input
                disabled={true}
                setter={setFirstName}
                value={firstName}
                label={"First Name"}
                placeholder={"First Name"}
              />
            </Col>
            <Col md={6}>
              <Input
                disabled={true}
                setter={setLastName}
                value={lastName}
                label={"Last Name"}
                placeholder={"Last Name"}
              />
            </Col>
            <Col md={12}>
              <Input
                disabled={true}
                setter={setEmail}
                value={email}
                label={"Email"}
                placeholder={"Email"}
              />
            </Col>
            <Col md={12}>
              <TextArea
                setter={setDescription}
                value={description}
                noOfRow={6}
                label={"Description"}
                placeholder={"Description"}
              />
            </Col>
            <Col md={12}>
              <div className={classes.btnMain}>
                <Button
                  onClick={handleSubmit}
                  label={isLoading ? "Submitting..." : "Submit"}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default ContactUs;
