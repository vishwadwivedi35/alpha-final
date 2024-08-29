import React from "react";
import { Link } from "react-router-dom";
import "../css/index.comp.css";
import logo from "../img/ALPHA-Logo-round-white.png";

const ContactUs = () => {
  return (
    <div className="page-content page-content__contact-us">
      <h1 className="shop-heading heading-static heading--contact-us">
        <Link className="header__logo-box" to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <h2 className="heading-primary--main heading-primary--static">
          Contact Us
        </h2>
      </h1>
      <div className="book__form book__form--contact-us">
        <form className="form contact-form">
          {/* <h2 className="heading-primary--sub heading--contact-us">
            Contact Form
          </h2> */}
          <div className="form__group">
            <label className="form__label">Name</label>
            <input type="text" name="name" className="form__input" />
            <label className="form__label">Farm Name</label>
            <input type="text" name="farmName" className="form__input" />
            <label className="form__label">Contact Number</label>
            <input type="text" name="contactNumber" className="form__input" />
            <label className="form__label">Address</label>
            <input type="text" name="address" className="form__input" />
            <label className="form__label">Pincode</label>
            <input type="text" name="pincode" className="form__input" />
            <label className="form__label">Email (optional)</label>
            <input type="email" name="email" className="form__input" />
            <label className="form__label">GSTIN Number (optional)</label>
            <input type="text" name="gstinNumber" className="form__input" />
          </div>
          <div className="form__group">
            <button className="btn btn--green btn--contact-us">
              Register &rarr;
            </button>
          </div>
        </form>
        <div className="contact-us__para">
          <p className="heading-primary">
            Customer Care Number: +91-9109410160
          </p>
          <p className="heading-primary">Email: info@alphamuscle.in</p>
          <p className="heading-primary">
            Address: G-1/1155, Man Sarovar Park, Delhi - 110032
          </p>
          <p className="heading-primary">
            For Bulk Orders/Sales: alphamuscle4@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
