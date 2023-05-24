import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AboutContent from "../../Components/AboutContent";
import Footer from "../../Components/Footer";
import HeroSection from "../../Components/HeroSection";
import NavBar from "../../Components/NavBar";
import TeamCard from "../../Components/TeamCard";
import classes from "./AboutUs.module.css";
import { aboutSectionData } from "../../Assets/Data/data";
import { aboutTeamData } from "../../Assets/Data/data";
import MemberDetailModal from "../../Components/MemberDetailModal";
const AboutUs = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <>
      <NavBar />
      <HeroSection
        heading={"About Us"}
        para={
          "Unlocking Success in IBA Courses: Welcome to Learnify.com, Your Personalized Tutoring Solution."
        }
      />
      <section className={classes.sectioMain}>
        <Container>
          {aboutSectionData?.map(({ heading, content, img }, index) => {
            return (
              <AboutContent
                heading={heading}
                content={content}
                img={img}
                index={index}
              />
            );
          })}
        </Container>
      </section>

      <section className={classes.ourTeam}>
        <h4>Our Team Members</h4>
        <p>
          Meet the Dedicated Minds Behind Learnify.com: Passionate Educators
          Committed to Your Academic Success.{" "}
        </p>
        <Container>
          <Row className="gy-4">
            {aboutTeamData?.map((item) => {
              return (
                <Col
                  onClick={() => {
                    setSelectedItem(item);
                  }}
                  className={classes.teamCol}
                  xl={3}
                  lg={4}
                  md={6}
                  sm={6}
                >
                  <TeamCard
                    onClick={() => {
                      setModalOpen(true);
                    }}
                    item={item}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
      <Footer />
      {modalOpen && (
        <MemberDetailModal
          selectedItem={selectedItem}
          setShow={setModalOpen}
          show={modalOpen}
        />
      )}
    </>
  );
};

export default AboutUs;
