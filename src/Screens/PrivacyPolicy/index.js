import React from "react";
import classes from "./PrivacyPolicy.module.css";
import HeroSection from "../../Components/HeroSection";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import { Container } from "react-bootstrap";
const PrivacyPolicy = () => {
  return (
    <>
      <NavBar />
      <HeroSection
        heading={"Privacy Policy"}
        para={
          "At Learnify, we respect your privacy and are committed to protecting it through our compliance with this policy."
        }
      />
      <Container>
        <div className={classes.header}>
          <h2>Learnify Platform Privacy Policy</h2>
          <h5>Last updated: (5/24/2023)</h5>
        </div>
        <div>
          <p>
            At Learnify, we respect your privacy and are committed to protecting
            it through our compliance with this policy. This policy describes:
          </p>
          <p>
            The types of information we may collect or that you may provide when
            you download, install, register with, access, or use the Learnify
            Platform. Our practices for collecting, using, maintaining,
            protecting, and disclosing that information. Information Collection
            We may collect several types of information from and about users of
            our platform, including information:
          </p>
          <p>
            By which you may be personally identified, such as name, postal
            address, e-mail address, telephone number, or any other identifier
            by which you may be contacted online or offline ("personal
            information"); That is about you but individually does not identify
            you, such as usage details, IP addresses, and information collected
            through cookies. Information Usage We use information that we
            collect about you or that you provide to us, including any personal
            information:
          </p>
          <p>
            To present our platform and its contents to you. To provide you with
            information, products, or services that you request from us. To
            fulfill any other purpose for which you provide it. To notify you
            about changes to our platform or any products or services we offer
            or provide though it. Information Disclosure We may disclose
            aggregated information about our users, and information that does
            not identify any individual, without restriction.
          </p>
          <p>
            We may disclose personal information that we collect, or you provide
            as described in this privacy policy: To our subsidiaries and
            affiliates. To contractors, service providers, and other third
            parties we use to support our business. To a buyer or other
            successor in the event of a merger, divestiture, restructuring,
            reorganization, dissolution, or other sale or transfer of some or
            all of Learnify's assets. To fulfill the purpose for which you
            provide it. For any other purpose disclosed by us when you provide
            the information. With your consent. Changes to the Privacy Policy We
            may update our Privacy Policy from time to time. We will notify you
            of any changes by posting the new Privacy Policy on this page.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page. Contact Information To ask questions or comment
            about this privacy policy and our privacy practices, contact us at:
            (your contact information)
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
