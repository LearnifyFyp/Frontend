import React from "react";
import classes from "./TermAndConditions.module.css";
import HeroSection from "../../Components/HeroSection";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import { Container } from "react-bootstrap";
const TermAndConditions = () => {
  return (
    <>
      <NavBar />
      <HeroSection
        heading={"Terms and conditions"}
        para={
          "Learnify reserves the right to modify these Terms and Conditions at any time."
        }
      />
      <section className={classes.mainSection}>
        <Container>
          <div className={classes.header}>
            <h2>Learnify Platform Terms and conditions</h2>
            <h5>Last updated: (5/24/2023)</h5>
          </div>
          <div>
            <h4>Acceptance of Terms</h4>
            <p>
              By accessing and using the Learnify Platform ("Platform"), you
              acknowledge that you have read, understood, and agree to be bound
              by these Terms and Conditions. If you do not accept these Terms
              and Conditions, you are not authorized to use the Platform.
            </p>
          </div>

          <div>
            <h4>Changes to Terms</h4>
            <p>
              Learnify reserves the right to modify these Terms and Conditions
              at any time. We will do our best to notify users of any
              significant changes, but it is your responsibility to check this
              page periodically for changes. Your continued use of the Platform
              following the posting of changes will mean that you accept and
              agree to the changes.
            </p>
          </div>

          <div>
            <h4> Accessing the Platform and Account Security</h4>
            <p>
              You are responsible for making all arrangements necessary for you
              to have access to the Platform. We reserve the right to withdraw
              or amend the Platform, and any service or material we provide on
              the Platform, in our sole discretion without notice. We will not
              be liable if, for any reason, all or any part of the Platform is
              unavailable at any time or for any period
            </p>
          </div>

          <div>
            <h4> Intellectual Property Rights</h4>
            <p>
              The Platform and its entire contents, features, and functionality
              (including but not limited to all information, software, text,
              displays, images, video, and audio, and the design, selection, and
              arrangement thereof) are owned by Learnify, its licensors, or
              other providers of such material and are protected by copyright,
              trademark, patent, trade secret, and other intellectual property
              or proprietary rights laws.
            </p>
          </div>
          <div>
            <h4> Prohibited Uses</h4>
            <p>
              You may use the Platform only for lawful purposes and in
              accordance with these Terms and Conditions.
            </p>
          </div>

          <div>
            <h4> User Contributions</h4>
            <p>
              The Platform may contain message boards, chat rooms, personal web
              pages or profiles, forums, bulletin boards, and other interactive
              features (collectively, "Interactive Services") that allow users
              to post, submit, publish, display, or transmit to other users or
              other persons content or materials (collectively, "User
              Contributions") on or through the Platform.
            </p>
          </div>
          <div>
            <h4>
              {" "}
              Disclaimer of Warranties, Limitation of Liability and
              Indemnification.
            </h4>
            <p>
              Your use of the Platform is at your own risk. The Platform is
              provided on an "as is" and "as available" basis, without any
              warranties of any kind, either express or implied.
            </p>
            <p>
              Neither Learnify nor any person associated with Learnify makes any
              warranty or representation with respect to the completeness,
              security, reliability, quality, accuracy, or availability of the
              Platform. Under no circumstance will Learnify, its affiliates, or
              their licensors, service providers, employees, agents, officers,
              or directors be liable for damages of any kind, under any legal
              theory, arising out of or in connection with your use, or
              inability to use, the Platform, any websites linked to it, any
              content on the Platform, or such other websites.
            </p>
            <p>
              You agree to defend, indemnify, and hold harmless Learnify, its
              affiliates, licensors, and service providers, and its and their
              respective officers, directors, employees, contractors, agents,
              licensors, suppliers, successors, and assigns from and against any
              claims, liabilities, damages, judgments, awards, losses, costs,
              expenses, or fees (including reasonable attorneys' fees) arising
              out of or relating to your violation of these Terms and Conditions
              or your use of the Platform.
            </p>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default TermAndConditions;
