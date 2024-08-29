import React from "react";
import { Link } from "react-router-dom";
import "../css/index.comp.css";
import logo from "../img/ALPHA-Logo-round-white.png";

const AboutUs = () => {
  return (
    <div className="page-content page-content__about-us">
      <h1 className="shop-heading heading-static">
        <Link className="header__logo-box" to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <h2 className="heading-primary--main heading-primary--static">
          {" "}
          About Us{" "}
        </h2>
      </h1>
      <div className="contact-us__para">
        <p className="heading-primary">
          <div className="contact-us__para">
            <p className="heading-primary">
              Welcome to Alpha Muscle Nutrition! Founded in 2021, Alpha Muscle
              Nutrition is your premier destination for high-quality sports
              nutrition supplements. Our mission is to support fitness
              enthusiasts and athletes on their journey toward optimal
              performance and health. We understand that the right nutrition is
              just as crucial as your training, and that's why we offer a
              comprehensive range of premium products, including weight gainers,
              whey protein, amino acids, and specialized pre- and post-workout
              supplements.
            </p>
          </div>
          <div className="contact-us__para">
            <p className="heading-primary">
              At Alpha Muscle Nutrition, our guiding philosophy revolves around
              a commitment to quality. We believe that true results stem from
              the finest ingredients, which is why we offer only premium,
              lab-tested supplements you can trust. Our promise is to never
              compromise on quality, ensuring that each product meets the
              highest standards in safety and efficacy. Our commitment to
              excellence reflects our dedication to enhancing your fitness
              journey.
            </p>
          </div>
          <div className="contact-us__para">
            <p className="heading-primary">
              Whether you're looking to build muscle, improve recovery, or
              maintain daily nutritional needs, we are here to support you every
              step of the way. Join our community of athletes and fitness lovers
              and experience the Alpha difference. Fuel your ambition with Alpha
              Muscle Nutrition — where quality meets performance!
            </p>
          </div>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
