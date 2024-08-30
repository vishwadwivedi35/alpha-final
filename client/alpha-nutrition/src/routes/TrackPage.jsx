import React from "react";
import "../css/index.comp.css";
import { Link } from "react-router-dom";
import logo from "../img/ALPHA-Logo-round-white.png";

const TrackPage = () => {
  return (
    <div className="page-content">
      <h1 className="heading--main-pages">
        <Link className="header__logo-box" to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <h1 className="heading--main-static">Track Your Order With Us</h1>
      </h1>
      <div className="contact-us__para">
        <p className="heading-static">
          Easily stay updated on your order's status with our tracking page.
          Simply enter your tracking number to see real-time updates and
          expected delivery times.
        </p>
      </div>
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link
            to="https://www.shiprocket.in/shipment-tracking/"
            className="navigation__link heading-primary heading--trackPage"
          >
            {`CLICK HERE: (Shiprocket Track Page)`}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TrackPage;
