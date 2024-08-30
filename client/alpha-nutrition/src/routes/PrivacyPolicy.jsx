import React from "react";
import { Link } from "react-router-dom";
import "../css/index.comp.css";
import logo from "../img/ALPHA-Logo-round-white.png";

const PrivacyPolicy = () => {
  return (
    <div className="page-content page-content__privacy">
      <h1 className="heading--main-pages">
        <Link className="header__logo-box" to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <h2 className="heading--main-static">Privacy Policy</h2>
      </h1>
      <div className="contact-us__para">
        <p className="heading-static">
          At Alpha Muscle, we respect and value the privacy of our customers.
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our website, including any
          other media form, media channel, mobile website, or mobile application
          related or connected thereto.
        </p>
      </div>
      <div className="contact-us__para">
        <p className="heading-static">
          Please read this Privacy Policy carefully. If you do not agree with
          the terms of this privacy policy, please do not access the site.
        </p>
      </div>
      <h3 className="heading-pages">Collection of Your Information:</h3>
      <div className="contact-us__para">
        <p className="heading-static">
          We may collect information about you in a variety of ways. The
          information we may collect on the website includes:
        </p>
      </div>
      <div className="contact-us__para">
        <ul>
          <li className="heading-static">
            <strong>Personal Data:</strong> Personally identifiable information,
            such as your name, shipping address, email address, and telephone
            number, and demographic information, such as your age, gender,
            hometown, and interests, that you voluntarily give to us when you
            register with the website or when you choose to participate in
            various activities related to the website.
          </li>
          <li className="heading-static">
            <strong>Derivative Data:</strong> Information our servers
            automatically collect when you access the website, such as your IP
            address, your browser type, your operating system, your access
            times, and the pages you have viewed directly before and after
            accessing the website.
          </li>
          <li className="heading-static">
            <strong>Financial Data:</strong> Financial information, such as data
            related to your payment method (e.g., valid credit card number, card
            brand, expiration date) that we may collect when you purchase,
            order, return, exchange, or request information about our services
            from the website.
          </li>
        </ul>
      </div>
      <h3 className="heading-pages">Use of Your Information:</h3>
      <div className="contact-us__para">
        <p className="heading-static">
          We use information collected about you in the following ways:
        </p>
      </div>
      <div className="contact-us__para">
        <ul>
          <li className="heading-static">To process transactions</li>
          <li className="heading-static">
            To send you marketing and promotional communications
          </li>
          <li className="heading-static">
            To respond to inquiries and offer support
          </li>
          <li className="heading-static">To protect our website</li>
          <li className="heading-static">
            To enforce our terms, conditions, and policies
          </li>
        </ul>
      </div>
      <h3 className="heading-pages">Shipping Policy:</h3>
      <div className="contact-us__para">
        <p className="heading-static">
          For International buyers, orders are shipped and delivered through
          registered international courier companies and/or International speed
          post only. For domestic buyers, orders are shipped through registered
          domestic courier companies and /or speed post only. Orders are shipped
          within 0-7 days or as per the delivery date agreed at the time of
          order confirmation and delivering of the shipment subject to Courier
          Company / post office norms. Pratyaksh Healthcare is not liable for
          any delay in delivery by the courier company / postal authorities and
          only guarantees to hand over the consignment to the courier company or
          postal authorities within 0-7 days from the date of the order and
          payment or as per the delivery date agreed at the time of order
          confirmation. Delivery of all orders will be to the address provided
          by the buyer. Delivery of our services will be confirmed on your mail
          ID as specified during registration. For any issues in utilizing our
          services you may contact our helpdesk no.
        </p>
      </div>
      <h3 className="heading-pages">Disclosure of Your Information:</h3>
      <div className="contact-us__para">
        <p className="heading-static">
          We may share information we have collected about you in certain
          situations. Your information may be disclosed as follows:
        </p>
      </div>
      <div className="contact-us__para">
        <ul>
          <li className="heading-static">By Law or to Protect Rights</li>
          <li className="heading-static">Third-Party Service Providers</li>
          <li className="heading-static">Marketing Communications</li>
          <li className="heading-static">Interactions with Other Users</li>
          <li className="heading-static">Online Postings</li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
