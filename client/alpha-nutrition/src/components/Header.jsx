// src/components/Header.jsx
import React from "react";
import "../css/index.comp.css";
import logo from "../img/alpha-logo.jpg";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div class="header__slider">
        <div class="header__slide header__slide--1"></div>
        <div class="header__slide header__slide--2"></div>
        <div class="header__slide header__slide--3"></div>
      </div>
      <Link className="header__logo-box" to="/">
        <img src={logo} alt="Logo" className="header__logo" />
      </Link>

      <div className="header__text-box">
        {/* <h1 className="heading-primary">
          <span className="heading-primary--main">Alpha Nutrition</span>
          {/* <span className="heading-primary--sub">is where life happens</span> */}
        {/*</h1> */}

        <Link to="/shop" className="btn btn--white btn--animated btn--header">
          Discover Our Products
        </Link>
        <Outlet />
      </div>
    </header>
  );
};

export default Header;
