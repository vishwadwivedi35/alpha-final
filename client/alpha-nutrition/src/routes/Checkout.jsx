import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../css/index.comp.css";

const Checkout = () => {
  return (
    <section className="section-book section-book__checkout">
      <div className="checkout">
        <h1 className="heading-primary heading-primary--static">
          <span className="heading-primary--main">Your Order Is Placed, </span>
          <span className="heading-primary--sub">Shop With Us Again</span>
        </h1>
        <Link className="btn btn--white btn--toHome" to="/">
          Back To Home
        </Link>
        <span className="heading-primary--sub">
          Track you order with us <Link to="/track">here</Link>
        </span>
        <Outlet />
      </div>
    </section>
  );
};

export default Checkout;
