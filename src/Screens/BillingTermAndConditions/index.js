import React from "react";
import classes from "./BillingTermAndConditions.module.css";
import HeroSection from "../../Components/HeroSection";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import { Container } from "react-bootstrap";
const BillingTermAndConditions = () => {
  return (
    <>
      <NavBar />
      <HeroSection
        heading={"Billing Term And Conditions"}
        para={
          "At Learnify, we respect your privacy and are committed to protecting it through our compliance with this policy."
        }
      />
      <section className={classes.mainSection}>
        <Container>
          <div className={classes.header}>
            <h2>Learnify Platform Billing Terms and conditions</h2>
            <h5>Last updated: (5/24/2023)</h5>
          </div>
          <div>
            <h4>Billing Cycle</h4>
            <p>
              The subscription fee for the Learnify Platform service and any
              other charges you may incur in connection with your use of the
              service will be charged on a monthly basis to your payment method
              on the calendar day corresponding to the commencement of your paid
              subscription.
            </p>
          </div>

          <div>
            <h4> Payment Methods</h4>
            <p>
              To use the Learnify Platform service you must provide one or more
              payment methods. You authorize us to charge any payment method
              associated to your account in case your primary payment method is
              declined or no longer available. You remain responsible for any
              uncollected amounts.
            </p>
          </div>

          <div>
            <h4> Cancellation</h4>
            <p>
              You can cancel your Learnify Platform subscription at any time,
              and you will continue to have access to the service through the
              end of your billing period. Payments are non-refundable and we do
              not provide refunds or credits for any partial membership periods.
            </p>
          </div>

          <div>
            <h4> Changes to the Price and Service Plans</h4>
            <p>
              We may change our service plans and the price of our service from
              time to time; however, any price changes or changes to your
              service plans will apply to subsequent billing cycles following
              notice of the change(s) to you.
            </p>
          </div>
          <div>
            <h4>No Refunds</h4>
            <p>Payments are nonrefundable and there are no refunds</p>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default BillingTermAndConditions;
