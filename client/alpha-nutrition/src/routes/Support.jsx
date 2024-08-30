import React from "react";
import { Link } from "react-router-dom";
import "../css/index.comp.css";
import logo from "../img/ALPHA-Logo-round-white.png";

const Support = () => {
  return (
    <div className="page-content page-content__support">
      <h1 className="heading--main-pages">
        <Link className="header__logo-box" to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <h2 className="heading--main-static">Support</h2>
      </h1>
      <div className="contact-us__para">
        <p className="heading-static">
          At Alphamuscle, we prioritize providing exceptional support to our
          valued customers. Whether you have questions about our products, need
          assistance with your order, or require guidance on how to achieve your
          fitness goals, our dedicated support team is here to help.
        </p>
      </div>
      <h3 className="heading-pages">Types of Support</h3>
      <ol className="contact-us__para">
        <li className="heading-static">
          Product Inquiries: Have questions about our products, ingredients, or
          nutritional information? Our knowledgeable support team is available
          to provide detailed information and guidance to help you make informed
          decisions.
        </li>
        <li className="heading-static">
          Order Assistance: Need help placing an order, tracking a shipment, or
          updating your account information? We're here to ensure that your
          ordering experience is smooth and hassle-free.
        </li>
        <li className="heading-static">
          Fitness Guidance: Looking for personalized fitness advice or workout
          recommendations? Our fitness experts are passionate about helping you
          achieve your health and wellness goals. Whether you're a seasoned
          athlete or just starting your fitness journey, we're here to support
          you every step of the way.
        </li>
      </ol>
      <h3 className="heading-pages">How to Contact Us:</h3>
      <div className="contact-us__para">
        <p className="heading-static">
          You can reach our support team via the following channels:
        </p>
      </div>
      <ul className="contact-us__para">
        <li className="heading-static">Email: info@alphamuscle.in</li>
        <li className="heading-static">Phone: +91-9109410160</li>
      </ul>
      <h3 className="heading-pages">Support Hours:</h3>
      <div className="contact-us__para">
        <p className="heading-static">
          Our support team is available to assist you during the following
          hours:
        </p>
      </div>
      <ul className="contact-us__para">
        <li className="heading-static">Monday to Friday: 10:30AM - 5:00PM</li>
      </ul>
      <h3 className="heading-pages">Response Time:</h3>
      <div className="contact-us__para">
        <p className="heading-static">
          We strive to respond to all inquiries promptly and aim to provide
          resolutions within 5 business days. Please note that response times
          may vary depending on the complexity of the inquiry and the volume of
          support requests.
        </p>
      </div>
      <h3 className="heading-pages">Feedback:</h3>
      <div className="contact-us__para">
        <p className="heading-static">
          We value your feedback and are continuously looking for ways to
          improve our support services. If you have any suggestions or comments
          on how we can better serve you, please don't hesitate to reach out to
          us.
        </p>
      </div>
      <h3 className="heading-pages">Thank You:</h3>
      <div className="contact-us__para">
        <p className="heading-static">
          Thank you for choosing Alpha Muscle! We appreciate your trust in our
          brand and are committed to providing you with exceptional support
          whenever you need it. Your satisfaction is our top priority, and we
          look forward to assisting you in any way we can.
        </p>
      </div>
    </div>
  );
};

export default Support;
