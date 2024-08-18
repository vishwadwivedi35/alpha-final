import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/index.comp.css";
import logo from "../img/alpha-logo.jpg";

// import logoGreen1x from "../img/logo-green-1x.png";
// import logoGreen2x from "../img/logo-green-2x.png";
// import logoGreenSmall1x from "../img/logo-green-small-1x.png";
// import logoGreenSmall2x from "../img/logo-green-small-2x.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <footer className="footer">
      <div className="footer__logo-box">
        <picture
          className="footer__logo"
          style={{ width: "50px", height: "50px" }}
        >
          {/* <source
            srcSet={`${logoGreenSmall1x} 1x, ${logoGreenSmall2x} 2x`}
            media="(max-width: 37.5em)"
          /> */}
          <img
            // srcSet={`${logoGreen1x} 1x, ${logoGreen2x} 2x`}
            alt="Full logo"
            src={logo}
            className="footer__logo-img"
          />
        </picture>
      </div>
      <div className="row">
        <div className="col-1-of-2 column-one">
          <div className="footer__navigation">
            <ul className="footer__list">
              <li className="footer__item">
                <span className="footer__link-header navigation__link">
                  Connect
                </span>
                <ul className="footer__sub-list">
                  <li className="footer__sub-item">
                    <a href="https://facebook.com" className="footer__link">
                      Facebook
                    </a>
                  </li>
                  <li className="footer__sub-item">
                    <a href="https://instagram.com" className="footer__link">
                      Instagram
                    </a>
                  </li>
                  <li className="footer__sub-item">
                    <a
                      href="mailto:support@example.com"
                      className="footer__link"
                    >
                      Gmail
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer__item">
                <span className="footer__link-header navigation__link">
                  Info
                </span>
                <ul className="footer__sub-list">
                  <li className="footer__sub-item">
                    <a href="/contact-us" className="footer__link">
                      Contact us
                    </a>
                  </li>
                  <li className="footer__sub-item">
                    <a href="/return-policy" className="footer__link">
                      Return Policy
                    </a>
                  </li>
                  <li className="footer__sub-item">
                    <a href="/support" className="footer__link">
                      Support
                    </a>
                  </li>
                  <li className="footer__sub-item">
                    <a href="/terms-conditions" className="footer__link">
                      Terms & Conditions
                    </a>
                  </li>
                  <li className="footer__sub-item">
                    <a href="/privacy-policy" className="footer__link">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer__item">
                <span className="footer__link-header navigation__link">
                  Category
                </span>
                <ul className="footer__sub-list">
                  <li className="footer__sub-item">
                    <a
                      href="#"
                      className="footer__link"
                      onClick={() => handleCategoryClick("Whey Protein")}
                    >
                      Whey Protein
                    </a>
                  </li>
                  <li className="footer__sub-item">
                    <a
                      href="#"
                      className="footer__link"
                      onClick={() =>
                        handleCategoryClick("Weight and Mass Gainers")
                      }
                    >
                      Weight and Mass Gainers
                    </a>
                  </li>
                  <li className="footer__sub-item">
                    <a
                      href="#"
                      className="footer__link"
                      onClick={() =>
                        handleCategoryClick("Pre and Post Workouts")
                      }
                    >
                      Pre and Post Workouts
                    </a>
                  </li>
                  <li className="footer__sub-item">
                    <a
                      href="#"
                      className="footer__link"
                      onClick={() => handleCategoryClick("Daily Essentials")}
                    >
                      Daily Essentials
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-1-of-2 column-two">
          <p className="footer__copyright">
            <span className="footer__link-header navigation__link">
              CONTACT INFO:
            </span>
            CUSTOMER CARE NUMBER: +91-9109410160
            <p>EMAIL: INFO@ALPHAMUSCLE.IN</p>
            <p>
              ADDRESS: G-1/1155, MAN SAROVAR PARK, DELHI - 110032 FOR BULK
              ORDERS/SALES: ALPHAMUSCLE4@GMAIL.COM
            </p>
          </p>
        </div>
      </div>
      <span className="footer__copyright copyright">
        &#169; 2024 Pixelsbucket. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
