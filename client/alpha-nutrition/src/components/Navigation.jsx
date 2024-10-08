import React, { useState, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { signOutUser } from "../utils/firebase/firebase.utils";
import "../css/index.comp.css";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
    closeNav();
  };

  return (
    <div className={`navigation ${isNavOpen ? "navigation--open" : ""}`}>
      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
        checked={isNavOpen}
        onChange={toggleNav}
      />

      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>

      <div className="navigation__background">&nbsp;</div>

      <nav className="navigation__nav">
        <ol className="navigation__list">
          <li className="navigation__item">
            <Link to="/" className="navigation__link" onClick={closeNav}>
              <span>&#8226;</span>Home
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/shop" className="navigation__link" onClick={closeNav}>
              <span>&#8226;</span>All Products
            </Link>
          </li>

          <li className="navigation__item">
            <Link
              to="/about-us"
              className="navigation__link"
              onClick={closeNav}
            >
              <span>&#8226;</span>About Us
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/contact-us"
              className="navigation__link"
              onClick={closeNav}
            >
              <span>&#8226;</span>Contact Us
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/cart" className="navigation__link" onClick={closeNav}>
              <span>&#8226;</span>Cart
            </Link>
          </li>
          <li className="navigation__item">
            {currentUser ? (
              <span
                className="navigation__link navigation__link--sign-out"
                onClick={signOutHandler}
              >
                SIGN OUT
              </span>
            ) : (
              <Link className="navigation__link" to="/auth" onClick={closeNav}>
                SIGN IN
              </Link>
            )}
          </li>
        </ol>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navigation;
